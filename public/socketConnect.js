import './autoscrollChat.js';
import findColor from './findColor.js';

socket.on('message', (data) => {
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
  if (jQuery(chatContainer.getElementsByTagName('div')[chatContainer.getElementsByTagName('div').length - 1]).offset().top <= chatContainer.offsetTop + chatContainer.offsetHeight) {
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
