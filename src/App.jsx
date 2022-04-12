import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Contact from "./pages/Contact/Contact";
import Projects from "./pages/Projects/Projects";
import Graphics from "./pages/Graphics/Graphics";
import Home from "./pages/Home/Home";

function App() {
  return (
    <Routes>
      <Route path="/projects" element={<Projects />} />
      <Route path="/graphics" element={<Graphics />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/home" element={<Home />} />
      <Route path="/" element={<Home />} />
      <Route path="/ReactPortfolio" element={<Home />} />
    </Routes>
  );
}

export default App;
