import React, { Component } from "react";
import HomePage from "./components/HomePage";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Contact from "./components/Contact";
import Books from "./components/Books";
import CreateBook from "./components/CreateBook";
import BookDetail from "./components/BookDetail";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Movies from "./components/Movies";
import CreateMovie from "./components/CreateMovie";
import MovieDetail from "./components/MovieDetail";
import BooksStephen from "./components/BooksStephen";
import RandomBook from "./components/RandomBook";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/books/:id" element={<BookDetail />} />
        <Route path="/movies/:id" element={<MovieDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/books" element={<Books />} />
        <Route path="/books/create" element={<CreateBook />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/create" element={<CreateMovie />} />
        <Route path="/books-stephen-king" element={<BooksStephen />} />
        <Route path="/random-book" element={<RandomBook />} />
      </Routes>
    </Router>
  );
}

export default App;
