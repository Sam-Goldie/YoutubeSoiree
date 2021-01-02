import React from 'react';
import './style.css';

const VideoDisplay = ({ url }) => {
  return <iframe title="video" width="560" height="315" src={url} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen="true" />;
}

export default VideoDisplay;
