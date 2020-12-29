const React = require('react');

console.log('im in urlSubmission');

function UrlSubmission(props) {
  console.log('heres props.changeVideo: ' + props.changeVideo);
  return (
    <div>
      <input id="submit-box" type="text" />
      <button type="submit" onClick={props.changeVideo}>Submit</button>
    </div>
  );
}

module.exports = UrlSubmission;
