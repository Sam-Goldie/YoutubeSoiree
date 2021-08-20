import './autoscrollChat.js';
import findColor from './findColor.js';

socket.on('message', (data) => {
  document.getElementById('username-modal').style.display = 'none';
  const displayName = document.createElement('div');
  displayName.setAttribute('class', 'chat-text username');
  displayName.style.color = findColor(data.user);
  displayName.append(`${data.user}:`)
  const displayBody = document.createElement('div');
  displayBody.setAttribute('class', 'chat-text');
  displayBody.append(data.body);
  const chatContainer = document.getElementById('chat-container');
  const displayMessage = document.createElement('div');
  displayMessage.setAttribute('class', 'message');
  displayMessage.append(displayName);
  displayMessage.append(displayBody);
  if (jQuery(chatContainer.getElementsByTagName('div').length) > 0 && jQuery(chatContainer.getElementsByTagName('div')[chatContainer.getElementsByTagName('div').length - 1]).offset().top <= chatContainer.offsetTop + chatContainer.offsetHeight) {
    chatContainer.append(displayMessage);
    chatContainer.scrollTo(0, chatContainer.scrollHeight);
  }
  chatContainer.append(displayMessage);
});

// socket.on('welcome', () => {
//   document.getElementById('username-modal').style.display = 'none';
// });

socket.on('play', (timecode) => {
  player.playVideo();
});

socket.on('pause', (timecode) => {
  player.seekTo(timecode, true);
  player.pauseVideo();
});

socket.on('seek', (timecode) => {
  player.seekTo(timecode, true);
});

socket.on('url', (url) => {
  player.loadVideoById(url);
});

socket.on('new-room', (roomid, password) => {
  console.log('new room successfully created');
  document.getElementById('username-modal').display = 'none';
  document.getElementById('link-display').innerText = window.location.href + `?id=${roomid}`;
  document.getElementById('password-display').innerText = password;
  document.getElementById('new-room-modal').display = 'fixed';
  window.onclick = function(event) {
    if (event.target === document.getElementById('new-room-modal')) {
      document.getElementById('new-room-modal').display = 'none';
      document.getElementById('username-modal').display = 'fixed'
    }
  }
})
