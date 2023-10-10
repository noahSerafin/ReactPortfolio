import React from "react";
import ProjectBlock from "../../components/ProjectBlock/ProjectBlock";
import tone from "../../assets/media/tone.jpg";
import rt from "../../assets/media/RT.jpg";
import britta from "../../assets/media/britta.jpg";
import aim from "../../assets/media/aim.jpg";
import nobul from "../../assets/media/nobul.jpg";
import OAE from "../../assets/media/OAEcrop.png";
import Calc from "../../assets/media/calc.png";
import Punk from "../../assets/media/punk.png"
import bd from "../../assets/media/bd.png";
import ft from "../../assets/media/foxtek.png";
import bc from "../../assets/media/bc.png";
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
            title="Foxtek RS"
            description="A Recruitment website for Foxtek Recruitment Solutions" 
            link="https://www.foxtekrs.com/"
            linkText="go to site"
            image={ft}/>
            <ProjectBlock 
            title="3tone Music" 
            description="React app frontend for 3tone Music Distribution." 
            link="https://www.3tonemusic.com/"
            linkText="go to site"
            image={tone}/>
            <ProjectBlock 
            title="Nobul RS" 
            description="A recruitment website for Nobul Resourcing Solutions" 
            link="https://www.nobulrs.com/"
            linkText="go to site"
            image={nobul}/>
            <ProjectBlock 
            title="Black Diamond" 
            description="A fashion recruitment website for The Black Diamond Agency" 
            link="https://www.theblackdiamondagency.com/"
            linkText="go to site"
            image={bd}/>
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
            title="Blockchain 121" 
            description="A site for Blockchain 121" 
            link="http://block121dev.wpengine.com//"
            linkText="go to site"
            image={bc}/>
        </div>
    )
}

export default Projects;