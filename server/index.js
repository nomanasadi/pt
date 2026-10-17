const express = require("express");
const mysql = require("mysql2");
const cors = require("cors")
const port = 9999;

const app = express();
app.use(express.json());
app.use(cors());

const connectionDetails = {
    "host" : "localhost",
    "port"  : 3306,
    "user" : "root",
    "password" : "12345",
    "database" : "wpt"
}

const executeQuery=(query , req ,res)=>{
      const connection = mysql.createConnection(connectionDetails);

      connection.query(query , (error , result)=>{
            if(error == null){
                res.send(result);
            }else(
                res.send(error)
            )

      })
}

app.get("/book" , (req ,res)=>{
     let query = `select * from books`;
     executeQuery(query , req ,res);
})

app.post("/book" , (req ,res)=>{
    let query = `insert into books values(${req.body.bookid} , '${req.body.bname}' , ${req.body.price})`;
    executeQuery(query , req ,res);
})

app.put("/book/:id" , (req ,res)=>{
    console.log(req.params.id)
     let query = `update books set bname='${req.body.bname}', price=${req.body.price} where bookid=${req.params.id}`;
     executeQuery(query , req ,res);
})

app.delete("/book/:id" , (req ,res)=>{
     let query = `delete from books where bookid=${req.params.id}`;
     executeQuery(query , req ,res);
})

app.listen(port , ()=>{
    console.log(`Server is running at port ${port}`)
})