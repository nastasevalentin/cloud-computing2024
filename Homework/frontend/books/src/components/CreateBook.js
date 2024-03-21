import React, { useState } from "react";
import "./Form.css";

const CreateBook = ({ setReload }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published_date, setPublished_date] = useState("");
  const [pages, setPages] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          author,
          published_date,
          pages,
        }),
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    }
    setReload((reload) => !reload);
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <label>
        Title:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <label>
        Author:
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </label>
      <label>
        Published Date:
        <input
          type="date"
          value={published_date}
          onChange={(e) => setPublished_date(e.target.value)}
        />
      </label>
      <label>
        Pages:
        <input
          type="number"
          value={pages}
          onChange={(e) => setPages(e.target.value)}
        />
      </label>
      <button type="submit">Create Book</button>
    </form>
  );
};

export default CreateBook;
