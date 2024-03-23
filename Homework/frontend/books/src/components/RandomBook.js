import React, { useEffect, useState } from "react";
import "./RandomBook.css";

const RandomBook = () => {
  const [book, setBook] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/random")
      .then((response) => response.json())
      .then((data) => {
        setBook(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <div>
      {book && book.author && (
        <div className="book-container">
          <div className="book-item">
            <h2>{book.title}</h2>
            <p>
              {book.author.first_name} {book.author.last_name}
            </p>
          </div>
        </div>
      )}
      {book && book.review && (
        <div className="review-box">
          <h3>Review by {book.review.name}</h3>
          <p>{book.review.body}</p>
        </div>
      )}
    </div>
  );
};

export default RandomBook;
