/// Change to gallery of Shaders

import React from "react";
import "./Graphics.scss";
import GraphicBlock from "../../components/GraphicBlock/GraphicBlock"
import ShaderViewer from "../../components/ShaderViewer/ShaderViewer";
import noise from "../../assets/media/noisey.png"

//<GraphicBlock title="Audio Reactive Shaders" description="placeholder text" media={froggy} />

const Graphics = () => {
    const noiseLink = "RWAgGLubH3M";
    const particleLink = "iGierBfEtrc";
    const gauLink = "S9RLBWOHaGM";

    return (
        <div className="page graphics">
            <h1 className="page-title">Graphics</h1>
            <h3 className="page-title">Experiments with Shaders</h3>
            <ShaderViewer />
            <GraphicBlock title="Noise Shaders" description="Smooth random noise displayed in 3D." media={noise} embedId={noiseLink}/>            
        </div>
    )
}

export default Graphics;         