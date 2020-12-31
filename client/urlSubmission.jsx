import React from 'react';

console.log('im in urlSubmission');

const UrlSubmission = (props) => {
  console.log('heres props.changeVideo: ' + props.changeVideo);
  return (
    <div>
      <input id="submit-box" type="text" />
      <button type="submit" onClick={props.changeVideo}>Submit</button>
    </div>
  );
};

export default UrlSubmission;
