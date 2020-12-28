import React, { useState } from 'react';
import ReactDOM from 'react-dom';

console.log('hello folks!');

const App = () => {
  const [url, changeVideo] = useState('');

  const submitURL = () => {
    let newURL = document.getElementById('submit-box').value;
    if (newURL.includes('watch?v=')) {
      console.log('non embedded video detected!');
      newURL = newURL.replace('watch?v=', 'embed/');
    }
    changeVideo(newURL);
  }

  return (
    <>
    <div>
      <input id='submit-box' type='text'/>
      <button onClick={submitURL}>Submit</button>
    </div>
    <div>
    <iframe width="560" height="315" src={url} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen='true'></iframe>
    </div>
    </>
  )
}

export default App;