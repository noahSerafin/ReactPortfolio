import React from "react";
import "./ProjectBlock.scss";

const ProjectBlock = (props) => {
    const {title, description, link, linkText, image} = props;

    return(
        <div className ="block">
            <h1 className="block-title">{title}</h1>
            <div className="grid">  
                <div className="grid-text">         
                <p className="block-p">{description}</p>
                {link !== undefined ? (
                <a className="site-link" href={link}>{linkText}</a>
                ) : (null)} 
                </div>             
                <div className="media">
                    <img className="image" src={image}/>
                </div>    
            </div>   
        </div>        
    )
}

export default ProjectBlock;