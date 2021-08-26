import './autoscrollChat.js';
import findColor from './findColor.js';

socket.on('message', (data) => {
  console.log('just recieved a message');
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
  window.location.href = window.location.href + `?id=${roomid}`;
  console.log('window location href is now: ' + window.location.href);
  document.getElementById('username-modal').style.display = 'none';
  console.log('what is password: ' + password);
  console.log('what is the value at password-entry: ' + document.getElementById('password-entry').value);
  document.getElementById('password-entry').value = password;
  console.log('what is the value at password-entry NOW: ' + document.getElementById('password-entry').value);
  document.getElementById('new-room-modal').style.display = 'initial';
  window.onclick = function(event) {
    if (event.target === document.getElementById('new-room-modal')) {
      document.getElementById('new-room-modal').display = 'none';
      document.getElementById('username-modal').display = 'fixed'
    }
  }
  socket.emit('signin', 'Host', roomid, password);
})
