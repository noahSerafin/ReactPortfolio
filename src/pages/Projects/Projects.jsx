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
import fuse from "../../assets/media/fuse.jpg";
import talent from "../../assets/media/talent.jpg";
import bc from "../../assets/media/bc.png";
import doro from "../../assets/media/dorothys.png";
import epos from "../../assets/media/EPOShero.png";
import eposb from "../../assets/media/epos2.png";
import out from "../../assets/media/outout.jpg";
import io from "../../assets/media/io.png";
import "./Projects.scss";

const Projects = () => {
    return (
        <div className="page projects">
            <h1 className="page-title">Projects</h1>
            <ProjectBlock 
            title="Talent International UK"
            description="A job API intergrated Recruitment website Talent International UK" 
            link="https://www.talentinternational.co.uk/"
            linkText="go to site"
            image={talent}/>
            <ProjectBlock 
            title="Foxtek RS"
            description="A recruitment website for Foxtek Recruitment Solutions" 
            link="https://www.foxtekrs.com/"
            linkText="go to site"
            image={ft}/>
            <ProjectBlock 
            title="Fuse Group"
            description="A recruitment website for Fuse Group" 
            link="https://www.fuse-group.com/"
            linkText="go to site"
            image={fuse}/>
            <ProjectBlock 
            title="Blockchain 121" 
            description="A Web3 recruitment site for Blockchain 121" 
            link="https://www.blockchain121.com/"
            linkText="go to site"
            image={bc}/>
            <ProjectBlock 
            title="EPOS Hero" 
            description="Landing page for EPOSHero.com using the Silicon bootstrap template" 
            image={epos}/>
            <ProjectBlock 
            title="io Meetups" 
            description="A site for Tech and Engineering event hosts io Meetups" 
            link="https://www.iomeetups.com/"
            linkText="go to site"
            image={io}/>
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
            title="eposbuddy" 
            description="A Webflow site for eposbuddy I made some changes to" 
            link="https://www.eposbuddy.com/"
            linkText="go to site"
            image={eposb}/>
            <ProjectBlock 
            title="3tone Music" 
            description="A React app frontend for 3tone Music Distribution" 
            image={tone}/>
            <ProjectBlock 
            title="Out Out Ibiza" 
            description="NodeJS site for Out Out venue in Plymouth" 
            link="https://outoutibiza.com/"
            linkText="go to site"
            image={out}/>
            <ProjectBlock 
            title="Dorothy's Diner" 
            description="NodeJS site for Dorothy's Diner in Liverpool" 
            image={doro}/>
            <ProjectBlock 
            title="AIM Housing" 
            description="A site for Aim Housing agency"
            link="https://www.aimhousing.co.uk/"
            linkText="go to site"
            image={aim}/>
            <ProjectBlock 
            title="Realtime Consulting"
            description="A Recruitment website integrated with a job posting api" 
            link="https://www.realtimeconsultants.co.uk/"
            linkText="go to site"
            image={rt}/>
            <ProjectBlock 
            title="OAE event programme" 
            description="A mobile app made with the #kapiti group at nology.io, front end built in React with a Java/firebase back end API. " 
            //link="https://noahserafin.github.io/OAE-event-programme-mock-mobile/" 
            linkText="go to site"
            image={OAE}/>
        </div>
    )
}

export default Projects;