import React, { Component } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Contact from "./pages/Contact/Contact";
import Projects from "./pages/Projects/Projects";
import Personal from "./pages/Personal/Personal";
import Graphics from "./pages/Graphics/Graphics";
import Home from "./pages/Home/Home";
import "./components/ThreeDBackground/ThreeDBackground.scss";

function App() {

  return (
    <Routes>
      <Route path="/projects" element={<Projects />} />
      <Route path="/graphics" element={<Graphics />} />
      <Route path="/personal" element={<Personal />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}

export default App;
// <Route path="/personal" element={<Personal />} />