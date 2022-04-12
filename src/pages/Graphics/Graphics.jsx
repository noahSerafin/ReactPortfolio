import React from "react";
import noise from "../../assets/media/noisey.png"
import froggy from "../../assets/media/froggy.png"
import gau from "../../assets/media/gau.png"
import kp from "../../assets/media/kpBall.png"
import "./Graphics.scss";
import GraphicBlock from "../../components/GraphicBlock/GraphicBlock"

//<GraphicBlock title="Audio Reactive Shaders" description="placeholder text" media={froggy} />

const Graphics = () => {
    const noiseLink = "RWAgGLubH3M";
    const particleLink = "iGierBfEtrc";
    const gauLink = "S9RLBWOHaGM";

    return (
        <div className="graphics">
            <h1 className="page-title">Graphics</h1>
            <GraphicBlock title="Noise Shaders" description="Smooth random noise displayed in 3D." media={noise} embedId={noiseLink}/>            
            <GraphicBlock title="Post Processing" description="Bloom, motion blur, stereoscopic 3D and more." media={froggy} embedId={particleLink}/>
            <GraphicBlock title="A.I. generated videos" description="Rendered in Nvidia's Gaugan A.I." media={gau} embedId={gauLink}/>
            <GraphicBlock title="Promotional Work" description="See more on my instagram." media={kp} link={"https://www.instagram.com/serafinsolutions/"} linkText={"see more"}/>
        </div>
    )
}

export default Graphics;         