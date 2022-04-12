import React from "react";
import "./Video.scss"

const Video = (props) => {

    const {embedId} = props;
    //`https://www.youtube.com/embed/  `https://youtu.be/
    if (!embedId) {
        console.error("No embedId provided for YoutubeEmbed component");
        return null;
      }
    
    return (
        <iframe
          className="youtube-embed"
          src={`https://www.youtube.com/embed/${embedId}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Embedded youtube"
        />
    );
};
export default Video;