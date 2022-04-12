import React from "react";
import ProjectBlock from "../../components/ProjectBlock/ProjectBlock";
import OAE from "../../assets/media/OAEcrop.png";
import Maze from "../../assets/media/maze.png";
import Calc from "../../assets/media/calc.png";
import Punk from "../../assets/media/punk.png";
import Quote from "../../assets/media/quote.png";
import Sphron from "../../assets/media/sphron.png";
import "./Projects.scss";

const Projects = () => {
    return (
        <div className="projects">
            <h1 className="page-title">Projects</h1>
            <ProjectBlock 
            title="OAE event programme" 
            description="A mobile app made with the #kapiti group at nology.io, front end built in React with a Java/firebase back end API. " 
            link="https://noahserafin.github.io/OAE-event-programme-mock-mobile/" 
            linkText="go to site"
            image={OAE}/>
            <ProjectBlock 
            title="Maze Game" 
            description="A simple maze game made in javascript." 
            link="https://noahserafin.github.io/mazeGame/"
            linkText="go to site"
            image={Maze}/>
            <ProjectBlock 
            title="Punk-API" 
            description="An API front end made in React listing available BrewDog beers with dynamic search and filter tags." 
            link="https://noahserafin.github.io/punk-api/"
            linkText="go to site"
            image={Punk}/>
            <ProjectBlock 
            title="Calculator" 
            description="A pair operation calculator made in Javascript." 
            link="https://noahserafin.github.io/Calculator/"
            linkText="go to site"
            image={Calc}/>
            <ProjectBlock 
            title="Quote API" 
            description="A collection of quotes from the last four US presidents. The home page has a guessing game attached where you can can guess who each quote belongs to." 
            image={Quote}/>
            <ProjectBlock 
            title="Sphron" 
            description="A 3D Tron-like made in Unity with C#" 
            image={Sphron}/>
        </div>
    )
}

export default Projects;