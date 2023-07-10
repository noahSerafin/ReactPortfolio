import React from "react";
import ProjectBlock from "../../components/ProjectBlock/ProjectBlock";
import tone from "../../assets/media/tone.jpg";
import rt from "../../assets/media/RT.jpg";
import britta from "../../assets/media/britta.jpg";
import aim from "../../assets/media/aim.jpg";
import nobul from "../../assets/media/nobul.jpg";
import OAE from "../../assets/media/OAEcrop.png";
import Calc from "../../assets/media/calc.png";
import Punk from "../../assets/media/punk.png";
import "./Projects.scss";

const Projects = () => {
    return (
        <div className="page projects">
            <h1 className="page-title">Projects</h1>
            <ProjectBlock 
            title="Realtime Consulting"
            description="A Recruitment website integrated with a job posting api" 
            link="https://www.realtimeconsultants.co.uk/"
            linkText="go to site"
            image={rt}/>
            <ProjectBlock 
            title="3tone Music" 
            description="React app frontend for 3tone Music Distribution." 
            link="https://www.3tonemusic.com/"
            linkText="go to site"
            image={tone}/>
            <ProjectBlock 
            title="Nobul RS" 
            description="A Recruitment website for Nobul Resourcing Solutions" 
            link="https://www.nobulrs.com/"
            linkText="go to site"
            image={nobul}/>
            <ProjectBlock 
            title="bb Designs" 
            description="A site for interior designer Britta Brunner" 
            link="https://bbdesigns.space/"
            linkText="go to site"
            image={britta}/>
            <ProjectBlock 
            title="AIM Housing" 
            description="A site for Aim Housing agency"
            link="https://www.aimhousing.co.uk/"
            linkText="go to site"
            image={aim}/>
            <ProjectBlock 
            title="OAE event programme" 
            description="A mobile app made with the #kapiti group at nology.io, front end built in React with a Java/firebase back end API. " 
            //link="https://noahserafin.github.io/OAE-event-programme-mock-mobile/" 
            linkText="go to site"
            image={OAE}/>
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
        </div>
    )
}

export default Projects;