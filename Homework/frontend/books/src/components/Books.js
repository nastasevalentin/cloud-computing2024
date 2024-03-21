import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Books.css";
import CreateBook from "./CreateBook";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [showCreateBook, setShowCreateBook] = useState(false);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3001/books")
      .then((response) => response.json())
      .then((data) => {
        setBooks(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [reload]);

  const deleteBook = (id) => {
    fetch(`http://localhost:3001/books/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setReload(!reload);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      {showCreateBook && <CreateBook setReload={setReload} />}
      <button
        className="button"
        onClick={() => setShowCreateBook(!showCreateBook)}
      >
        {showCreateBook ? "Cancel" : "Create a Book"}{" "}
      </button>
      <div class="books-container">
        {books.map((book) => (
          <div key={book.id} className="book-item">
            <Link to={`/books/${book.id}`}>
              <h2>{book.title}</h2>
            </Link>
            <p>{book.author}</p>
            <button
              className="delete-button"
              onClick={() => deleteBook(book.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Books;
