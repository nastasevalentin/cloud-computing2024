import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./BookDetail.css";

function BookDetail() {
  let { id } = useParams();
  const [book, setBook] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [updatedBook, setUpdatedBook] = useState({});
  const [reload, setReload] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/books/${id}`)
      .then((response) => {
        const bookData = response.data;
        setBook(bookData);
        setUpdatedBook(bookData); 
        console.log(bookData.pages);
      })
      .catch((error) => {
        console.error(`Error fetching data: ${error}`);
      });
  }, [id, reload]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedBook((prevBook) => ({
      ...prevBook,
      [name]: name === 'pages' && !isNaN(value) ? parseInt(value, 10) : value,
    }));
  };

  const handleUpdate = (event) => {
  event.preventDefault();
  axios
    .put(`http://localhost:3001/books/${id}`, updatedBook)
    .then((response) => {
      console.log(response.data); 
      setBook(response.data);
      setShowPopup(false);
      setReload(!reload);
    })
    .catch((error) => {
      console.error(`Error updating data: ${error}`);
    });
};

  if (!book) return "Loading...";
  const date = new Date(book.published_date);
  const formattedDate = `${date.getDate()}-${
    date.getMonth() + 1
  }-${date.getFullYear()}`;

  return (
    <div className="book-detail-container">
      <div className="book-detail">
        <h2>{book.title}</h2>
        <p>{book.author}</p>
        <p>{formattedDate}</p>
        <p>{book.pages}</p>
        <button onClick={() => setShowPopup(true)}>Update Book</button>
        {showPopup && (
  <div className="popup">
    <form onSubmit={handleUpdate} style={{ display: 'flex', flexDirection: 'column' }}>
      <label style={{ margin: '10px 0' }}>
        Title:
        <input type="text" name="title" onChange={handleInputChange} />
      </label>
      <label style={{ margin: '10px 0' }}>
        Author:
        <input type="text" name="author" onChange={handleInputChange} />
      </label>
      <label style={{ margin: '10px 0' }}>
        Published Date:
        <input type="date" name="published_date" onChange={handleInputChange} />
      </label>
      <label style={{ margin: '10px 0' }}>
        Pages:
        <input type="number" name="pages" onChange={handleInputChange}/>
      </label>
      <div style={{ margin: '10px 0' }}>
        <button type="submit">Submit</button>
        <button type="button" onClick={() => setShowPopup(false)}>Cancel</button>
      </div>
    </form>
  </div>
)}
      </div>
    </div>
  );
}

export default BookDetail;