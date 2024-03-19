import React, { Component } from "react";
import HomePage from "./components/HomePage";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Contact from "./components/Contact";
import Books from "./components/Books";
import CreateBook from "./components/CreateBook";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/books" element={<Books />} />
        <Route path="/books/create" element={<CreateBook />} />
      </Routes>
    </Router>
  );
}

export default App;
