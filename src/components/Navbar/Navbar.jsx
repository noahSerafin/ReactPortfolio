import { NavLink, useLocation } from "react-router-dom";
import "./Navbar.scss";
import RbOn from "../../assets/media/rbOn";
import RbOff from "../../assets/media/rbOff";
import React, { useState, useEffect } from "react";

const NavBar = () => {
    var [currentPage, setCurrentPage] = useState();  
    useLocation();  

    useEffect(() => {
        const url = window.location.href;
        const page = url.substring(url.lastIndexOf('/') + 1);
        setCurrentPage(currentPage = page)
    });      
      
    return (
        <div className="navbar" id="nav">
            <NavLink to="/home">
                <h1 className="title">Noah Serafin</h1>          
                <h3 className="title">Junior Developer</h3>   
            </NavLink>      
            <div className="navbar-pages">
                <NavLink className="nav-page" to="/projects">Projects
                {currentPage === "projects" ? (<RbOn />) : (<RbOff />)}                
                </NavLink>
                <NavLink className="nav-page" to="/graphics">Graphics
                {currentPage === "graphics" ? (<RbOn />) : (<RbOff />)}  
                </NavLink>                
                <NavLink className="nav-page" to="/contact">Contact
                {currentPage === "contact" ? (<RbOn />) : (<RbOff />)}  
                </NavLink>                
            </div>          
        </div>
    )
};

export default NavBar;