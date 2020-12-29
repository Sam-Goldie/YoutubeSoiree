import React, { useState } from 'react';
import UrlSubmission from './UrlSubmission.jsx';
import ChatContainer from './ChatContainer.jsx';
import VideoDisplay from './VideoDisplay.jsx';

const App = () => {
  const [url, changeVideo] = useState('https://www.youtube.com/embed/IY9YNF5MMQo');

  const submitURL = () => {
    let newURL = document.getElementById('submit-box').value;
    if (newURL.includes('watch?v=')) {
      newURL = newURL.replace('watch?v=', 'embed/');
    }
    changeVideo(newURL);
  };

  return (
    <>
      <UrlSubmission submitURL={submitURL} />
      <VideoDisplay url={url} />
      <ChatContainer />
    </>
  );
};

export default App;
