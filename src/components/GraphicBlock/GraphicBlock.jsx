import "./GraphicBlock.scss";
import Video from "../Video/Video";
import React, {useState} from "react";

const GraphicBlock = (props) => {
    const {title, description, link, linkText, media, embedId} = props;
    const [showVideo, setShowVideo] = useState(false);

    const handleClick = () => {
        setShowVideo(!showVideo);
    };

    const blockClassName = `${
        showVideo ? "gblock-vid" : "grid"
    }`

    return(
        <div className="block">
            <h1 className="block-title">{title}</h1>
            <div className={blockClassName}> 
            {showVideo ? (
                <>
                <Video embedId={embedId}/> 
                <button className="site-link" onClick={handleClick}>close</button>
                </>                
            ) : (
            <>
            <div className="grid-text">
                <p className="block-p">{description}</p>
                {link != undefined ? (
                <a className="site-link" href={link}>{linkText}</a>
                ) : (null)}
            </div>
            <div className="media">
                {embedId ? (
                    <>
                    <img onClick={handleClick} className="image" src={media} alt=""></img>
                    <p>click to expand.</p>
                    </>
                ) : (
                    <img className="image" src={media} alt=""></img>
                )}                
            </div>
            </>
            )}  
            </div>     
        </div>        
    )
}

export default GraphicBlock;