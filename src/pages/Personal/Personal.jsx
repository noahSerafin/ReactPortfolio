import React from "react";
import './Personal.scss';
import noise from "../../assets/media/noisey.png"
import froggy from "../../assets/media/froggy.png"
import gau from "../../assets/media/gau.png"
import kp from "../../assets/media/kpBall.png"
import "./Graphics.scss";
import GraphicBlock from "../../components/GraphicBlock/GraphicBlock"
import ProjectBlock from "../../components/ProjectBlock/ProjectBlock";
import Maze from "../../assets/media/maze.png";
import Sphron from "../../assets/media/sphron.png";

const Personal = () => { 

    const noiseLink = "RWAgGLubH3M";
    const particleLink = "iGierBfEtrc";
    const gauLink = "S9RLBWOHaGM";

    return (
        <div className="page graphics">
            <h1 className="page-title">Personal Projects</h1>
            <GraphicBlock title="Noise Shaders" description="Smooth random noise displayed in 3D." media={noise} embedId={noiseLink}/>            
            <GraphicBlock title="Post Processing" description="Bloom, motion blur, stereoscopic 3D and more." media={froggy} embedId={particleLink}/>
            <GraphicBlock title="A.I. generated videos" description="Rendered in Nvidia's Gaugan A.I." media={gau} embedId={gauLink}/>
            <GraphicBlock title="Promotional Work" description="See more on my instagram." media={kp} link={"https://www.instagram.com/serafinsolutions/"} linkText={"see more"}/>
            <ProjectBlock 
            title="Maze Game" 
            description="A simple maze game made in javascript." 
            link="https://noahserafin.github.io/mazeGame/"
            linkText="go to site"
            image={Maze}/>
            <ProjectBlock 
            title="Sphron" 
            description="A 3D Tron-like made in Unity with C#" 
            image={Sphron}/>
        </div>
    )
}

export default Personal;