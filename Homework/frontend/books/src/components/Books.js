import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Books.css";
import CreateBook from "./CreateBook";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [showCreateBook, setShowCreateBook] = useState(false); // New state variable
  const [reload, setReload] = useState(false); // New state variable
  useEffect(() => {
    fetch("http://localhost:3000/books")
      .then((response) => response.json())
      .then((data) => {
        setBooks(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [reload]);

  return (
    <div>
      {showCreateBook && <CreateBook setReload={setReload} />}
      {/* Only show CreateBook if showCreateBook is true */}
      <button
        className="button"
        onClick={() => setShowCreateBook(!showCreateBook)}
      >
        {showCreateBook ? "Cancel" : "Create a Book"}{" "}
        {/* Toggle button text based on showCreateBook state */}
      </button>
      <div class="books-container">
        {books.map((book) => (
          <div key={book.id} className="book-item">
            <h2>{book.title}</h2>
            <p>{book.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Books;
