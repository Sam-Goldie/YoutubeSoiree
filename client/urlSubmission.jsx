import React from 'react';

const UrlSubmission = ({ submitURL }) => (
  <div>
    <input id="submit-box" type="text" />
    <button type="submit" onClick={submitURL}>Submit</button>
  </div>
);

export default UrlSubmission;
