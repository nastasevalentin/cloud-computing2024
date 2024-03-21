import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./BookDetail.css";

function BookDetail() {
  let { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/books/${id}`)
      .then((response) => {
        setBook(response.data);
      })
      .catch((error) => {
        console.error(`Error fetching data: ${error}`);
      });
  }, [id]);

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
      </div>
    </div>
  );
}

export default BookDetail;
