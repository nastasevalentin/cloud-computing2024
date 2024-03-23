import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./BooksStephen.css";

const BooksStephen = () => {
  const [books, setBooks] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3001/stephen-king-books")
      .then((response) => response.json())
      .then((result) => {
        setBooks(result.data);
        console.log(result.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [reload]);

  return (
    <div>
      <div className="books-container">
        {Array.isArray(books) &&
          books.map((book) => (
            <div key={book.id} className="book-item">
              <h2>{book.Title}</h2>
              <p>{book.Publisher}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default BooksStephen;
