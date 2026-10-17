// import React, { useEffect, useState } from 'react'
// import axios from "axios"
// import "../node_modules/bootstrap/dist/css/bootstrap.min.css"

// const Home = () => {

//     const [detail , setDetail] = useState({"bookid" : 0 , "bname" : "" , "price" : ""});
//     const [books , setBooks] = useState([]);
//     const [msg , setMsg] = useState("");
//     const [disable , setDisable] = useState(false);

//     const handleChange=(event)=>{
//             const cpyDetail = {...detail};
            
//             cpyDetail[event.target.name] = event.target.value;
//             setDetail(cpyDetail);
//     }

//     const url = "http://localhost:9999/book"
//     const getBooks=()=>{
//         axios.get(url).then((result)=>{
//             setBooks(result.data);
//         })
//     }

//     const handleDelete=async(book)=>{
//         await axios.delete(url+"/"+book.bookid).then((result)=>{
//             if(result.data.affectedRows > 0){
//                 setMsg("Book Deleted")
//                 setTimeout(()=>{
//                     setMsg("")
                    
//                   },3000)
//             }
//         })
//         getBooks();
//     }
    
//     const handleAdd=async()=>{

//         if(detail.bookid==0 || detail.bname == "" || detail.price==""){
//             alert("Please enter data");
//         }else{
//             if(!validate()){
//                 return;
//             }
            
//             await axios.post(url , detail).then((result)=>{
//                 if(result.data.affectedRows > 0){
//                     setMsg("Book added successfully")
//                     setTimeout(()=>{
//                         setMsg("")
                        
//                     },3000)
//                 }
//             })
//             setDetail({"bookid" : 0 , "bname" : "" , "price" : ""})
//             getBooks();
//         }
//     }

//     const handleEdit=(book)=>{
//         setDetail(book);
//         setDisable(true)
//     }

//     const handleUpdate=async()=>{
//         await axios.put(url+"/"+detail.bookid , detail).then((result)=>{
//              if(result.data.affectedRows > 0){
//                 setMsg("Book Updated")
//                  setTimeout(()=>{
//                         setMsg("")
                        
//                     },3000)
//                 setDetail({"bookid" : 0 , "bname" : "" , "price" : ""})
//              }
//         })
//          setDisable(false)
//         getBooks();
//     }

//     const validate=()=>{
//         if(detail.bname.trim().length < 4){
//             alert("book name should contain more then 4 letter")
//             return false;
//         }
//         return true
//     }

//     useEffect(()=>{
//       getBooks();
//     },[])
//   return (
//     <div>
//     <div className='h-[10px]'>{msg}</div>
//       <table>
//         <tbody>
//             <tr>
//                 <td>Book ID :</td>
//                 <td><input type="text" name='bookid' value={detail.bookid} onChange={handleChange} /></td>
//             </tr>
//             <tr>
//                 <td>Book Name :</td>
//                 <td><input type="text" name='bname' value={detail.bname} onChange={handleChange} /></td>
//             </tr>
//             <tr>
//                 <td>Pice :</td>
//                 <td><input type="number" name='price' value={detail.price} onChange={handleChange} /></td>
//             </tr>
//             <tr>
//                 <td ><button onClick={handleAdd} className='btn btn-primary' disabled={disable} >Add Book</button> </td>
//                 <td> <button onClick={handleUpdate} className='btn btn-secondary mx-3'>Update</button></td>
//             </tr>
//         </tbody>
//       </table>

//       <table border="1">
//          <thead>
//             <tr>
//                 <td>Book ID</td>
//                 <td>Book Name</td>
//                 <td>Price</td>
//                 <td>Edit</td>
//                 <td>Delete</td>
//             </tr>
//          </thead>
//          <tbody>
//          {books.map((book)=>{
//             return(
//             <tr>
//                 <td>{book.bookid}</td>
//                 <td>{book.bname}</td>
//                 <td>{book.price}</td>
//                 <td><button className='btn btn-primary' onClick={()=>handleEdit(book)}>Edit</button></td>
//                 <td><button className='btn btn-danger' onClick={()=>handleDelete(book)}>Delete</button></td>
//             </tr>
//             )
//          })
//          }
//          </tbody>
//       </table>
//     </div>
//   )
// }

// export default Home


import React, { useEffect, useState } from 'react'
import axios from "axios"
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"

const Home = () => {

    const [detail, setDetail] = useState({ bookid: 0, bname: "", price: "" });
    const [books, setBooks] = useState([]);
    const [msg, setMsg] = useState("");
    const [disable, setDisable] = useState(false);

    const handleChange = (event) => {
        const cpyDetail = { ...detail };
        cpyDetail[event.target.name] = event.target.value;
        setDetail(cpyDetail);
    }

    const url = "http://localhost:9999/book";

    const getBooks = () => {
        axios.get(url).then((result) => {
            console.log(result.data)
            setBooks(result.data);
        });
    }

    const handleDelete = async (book) => {
        await axios.delete(url + "/" + book.bookid).then((result) => {
            if (result.data.affectedRows > 0) {
                setMsg("Book Deleted");
                setTimeout(() => setMsg(""), 3000);
            }
        });
        getBooks();
    }

    const handleAdd = async () => {
        if (detail.bookid == 0 || detail.bname == "" || detail.price == "") {
            alert("Please enter data");
        } else {
            if (!validate()) {
                return;
            }

            await axios.post(url, detail).then((result) => {
                if (result.data.affectedRows > 0) {
                    setMsg("Book added successfully");
                    setTimeout(() => setMsg(""), 3000);
                }
            });

            setDetail({ bookid: 0, bname: "", price: "" });
            getBooks();
        }
    }

    const handleEdit = (book) => {
        setDetail(book);
        setDisable(true);
    }

    const handleUpdate = async () => {
        await axios.put(url + "/" + detail.bookid, detail).then((result) => {
            if (result.data.affectedRows > 0) {
                setMsg("Book Updated");
                setTimeout(() => setMsg(""), 3000);
                setDetail({ bookid: 0, bname: "", price: "" });
            }
        });

        setDisable(false);
        getBooks();
    }

    const validate = () => {
        if (detail.bname.trim().length < 4) {
            alert("Book name should contain more than 4 letters");
            return false;
        }
        return true;
    }

    useEffect(() => {
        getBooks();
    }, []);

    return (
        <div className="container mt-4">

            <h2 className="text-center text-primary mb-4">
                Book Management System
            </h2>

            {msg && (
                <div className="alert alert-success py-2">
                    {msg}
                </div>
            )}

            {/* Book Form */}
            <div className="card shadow-sm p-4 mb-4">

                <h5 className="mb-3">Book Details</h5>

                <div className="mb-3">
                    <label className="form-label">Book ID</label>
                    <input
                        type="number"
                        name="bookid"
                        className="form-control"
                        value={detail.bookid}
                        onChange={handleChange}
                        disabled={disable}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Book Name</label>
                    <input
                        type="text"
                        name="bname"
                        className="form-control"
                        placeholder="Enter book name"
                        value={detail.bname}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Price</label>
                    <input
                        type="number"
                        name="price"
                        className="form-control"
                        placeholder="Enter price"
                        value={detail.price}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <button
                        onClick={handleAdd}
                        className="btn btn-primary me-2"
                        disabled={disable}
                    >
                        Add Book
                    </button>

                    <button
                        onClick={handleUpdate}
                        className="btn btn-warning"
                    >
                        Update Book
                    </button>
                </div>

            </div>

            {/* Books Table */}
            <div className="card shadow-sm p-3">

                <h5 className="mb-3">Book List</h5>

                <div className="table-responsive">
                    <table className="table table-bordered table-striped table-hover text-center align-middle">

                        <thead className="table-dark">
                            <tr>
                                <th>Book ID</th>
                                <th>Book Name</th>
                                <th>Price</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>

                        <tbody>
                            {books.map((book) => (
                                <tr key={book.bookid}>
                                    <td>{book.bookid}</td>
                                    <td>{book.bname}</td>
                                    <td>₹{book.price}</td>

                                    <td>
                                        <button
                                            className="btn btn-sm btn-primary"
                                            onClick={() => handleEdit(book)}
                                        >
                                            Edit
                                        </button>
                                    </td>

                                    <td>
                                        <button
                                            className="btn btn-sm btn-danger"
                                            onClick={() => handleDelete(book)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}

                            {books.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="text-muted py-3">
                                        No books available
                                    </td>
                                </tr>
                            )}
                        </tbody>

                    </table>
                </div>

            </div>

        </div>
    )
}

export default Home