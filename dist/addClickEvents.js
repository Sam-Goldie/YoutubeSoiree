// import './socketConnect';
// import Cookies from '../node_modules/js-cookie/src/js.cookie.js';

console.log('what is Cookies lol?' + Cookies);
console.log('im inside index.js in the client folder');

// let currentVideo = 'https://youtu.be/IY9YNF5MMQo';

// https://youtu.be/LFeJuCYoyfQ

document.addEventListener('keyup', (event) => {
  if (event.keyCode === 13) {
    document.getElementById('message-submit').click();
  }
});

document.getElementById('url-submit').onclick = () => {
  console.log('IM INSIDE CHANGEVIDEO!');
  let newVideoId = document.getElementById('submit-box').value;
  document.getElementById('submit-box').value = '';
  newVideoId = newVideoId.substring(newVideoId.lastIndexOf('/') + 1);
  if (newVideoId.includes('watch?v=')) {
    newVideoId = newVideoId.substring(newVideoId.indexOf('=') + 1);
  }
  if (newVideoId.includes('&')) {
    newVideoId = newVideoId.substring(0, newVideoId.lastIndexOf('&'));
  }
  console.log(`the newURL is: ${newVideoId}`);
  debugger;
  socket.emit('url', newVideoId);
  player.loadVideoById(newVideoId);
  // player = new YT.Player('video-player', {
  //   // why am i hardcapped on iframe dimensions?
  //   height: '100%',
  //   width: '100%',
  //   videoId: newVideoId,
  //   events: {
  //     onReady: onPlayerReady,
  //     onStateChange: onPlayerStateChange,
  //   },
  // });
};

// onclick={window.changeVideo}
document.getElementById('message-submit').onclick = () => {
  const newText = document.getElementById('message-input').value;
  if (newText === '') {
    return;
  }
  console.log('heres the newText: ' + newText);
  const addedMessage = {
    user: 'Sam Goldie',
    body: newText,
  };
  document.getElementById('message-input').value = '';
  console.log(`heres the new message: ${addedMessage}`);
  console.log(`here are the cookies: ${Cookies.get('session')}`);
  socket.emit('message', addedMessage, Cookies.get('session'));
  const newMessage = document.createElement('div');
  newMessage.append(`Me:  ${addedMessage.body}`);
  const chatContainer = document.getElementById('chat-container');
  chatContainer.append(newMessage);
  chatContainer.scrollBy(0, chatContainer.scrollHeight);
};

document.getElementById('session-submit').onclick = () => {
  console.log('setting the cookies!!');
  Cookies.set('session', document.getElementById('session-input').value);
};
