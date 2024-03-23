import React from "react";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div
      style={{
        display: "flex",
        height: "800px",
      }}
    >
      <div
        style={{
          flex: 1,
          backgroundColor: "#9D4250",
          color: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "30px",
        }}
      >
        <h1 className="homeText">Welcome to the our Bookstore</h1>
        <p className="text">
          We have a wide selection of books for you to choose from. Please feel
          free to browse our collection.
        </p>
      </div>
      <div
        style={{
          flex: 1,
          background: "url('/books_home2.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    </div>
  );
};

export default HomePage;
