import { NavLink, useLocation } from "react-router-dom";
import "./Navbar.scss";
import RbOn from "../../assets/media/rbOn";
import RbOff from "../../assets/media/rbOff";
import React, { useState, useEffect } from "react";

const NavBar = () => {
    
    var [currentPage, setCurrentPage] = useState();  
    useLocation();  

    useEffect(() => {
        window.scrollTo(0, 0);
        const url = window.location.href;
        const page = url.substring(url.lastIndexOf('/') + 1);
        setCurrentPage(currentPage = page);        
    });      
    
    const pageClass = currentPage;

    return (
        <div className="navbar-container">
            <div className={`navbar nav--${pageClass}`} id="nav">
                <NavLink to="/home">
                    <div className="title">
                        <h1 className="site-header">N<span>oah</span>S<span>erafin</span></h1>          
                        <h3 className="title">Web Developer</h3>   
                    </div>
                </NavLink>      
                <div className="navbar__pages">
                    <NavLink className="nav-page" to="/projects">Projects
                    {currentPage === "projects" ? (<RbOn />) : (<RbOff />)}                
                    </NavLink>
                    <NavLink className="nav-page" to="/personal">Personal
                    {currentPage === "personal" ? (<RbOn />) : (<RbOff />)}  
                    </NavLink>
                   
                    <NavLink className="nav-page" to="/contact">Contact
                    {currentPage === "contact" ? (<RbOn />) : (<RbOff />)}  
                    </NavLink>                
                </div>          
            </div>
        </div>
    )
};

export default NavBar;
// <a className="nav-page" href="https://noahserafin.github.io/shaders/">Shaders</a>

/* <NavLink className="nav-page" to="/graphics">Shaders
                    {currentPage === "graphics" ? (<RbOn />) : (<RbOff />)}  
                    </NavLink>
                    */