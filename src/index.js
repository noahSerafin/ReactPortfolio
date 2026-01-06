import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { HashRouter as Router } from "react-router-dom";
import NavBar from './components/Navbar/Navbar';
import CanvasWrapper from './CanvasWrapper';

const container = document.getElementById('root');
const root = createRoot(container)


//.render attaches to root in index.html
root.render(
  <React.StrictMode>
    <Router >
      <CanvasWrapper />
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
