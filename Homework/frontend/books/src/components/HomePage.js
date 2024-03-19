import React from "react";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div>
      <h1 className="homeText">Welcome to the our Bookstore</h1>
      <p className="text">
        We have a wide selection of books for you to choose from. Please feel
        free to browse our collection.
      </p>
      <img src="/books_home2.jpg" alt="bookstore" className="bookstoreImage" />
    </div>
  );
};

export default HomePage;
