import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from "react-router-dom";
import NavBar from './components/Navbar/Navbar';
import ThreeDBackground from './components/ThreeDBackground/ThreeDBackground';

import Three from './three';

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM')
});

window.addEventListener('load', () => {
  const canvas = document.querySelector('#canvas');
  console.log(canvas)
  if (canvas) {
    new Three(canvas);
  }
});

const container = document.getElementById('root');
const root = createRoot(container)


//.render attaches to root in index.html
root.render(
  <React.StrictMode>
    <Router >
    
    <canvas id="canvas" class="z-[0] h-full w-full"></canvas>
      <NavBar />      
      <App />      
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
//<ThreeDBackground />

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
