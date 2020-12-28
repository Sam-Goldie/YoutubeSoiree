import React, { useState } from 'react';
import ReactDOM from 'react-dom';

console.log('hello folks!');

const App = () => {
  const [url, changeVideo] = useState('');

  const submitURL = () => {
    console.log('im inside submitUrl!');
    changeVideo(document.getElementById('submit-box').value);
  }

  return (
    <>
    <div>GREETINGS FROM ME, SAM!</div>
    <div>
      <input id='submit-box' type='text'/>
      <button onClick={submitURL}>Submit</button>
    </div>
    <div>
    <iframe width="560" height="315" src={url} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
    </>
  )
}

export default App;