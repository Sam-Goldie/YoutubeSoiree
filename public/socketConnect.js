// turns out, iframes keep track of time data more granularly than seconds. implement greater precision of playback sync when you have time

import './autoscrollChat.js';

socket.on('message', (data) => {
  let mustScroll = false;
  console.log(`data is: ${data}`);
  const newMessage = document.createElement('div');
  newMessage.append(`${data.user}  ${data.body}`);
  const chatContainer = document.getElementById('chat-container');
  console.log('the current distance from bottom is: ' + (chatContainer.height - chatContainer.scrollTop).toString());
  if (chatContainer.height - chatContainer.scrollTop === 0) {
    mustScroll = true;
  }
  chatContainer.append(newMessage);
  if (mustScroll) {
    autoscrollChat();
  }
});

socket.on('play', (timecode) => {
  // player.seekTo(timecode, true);
  player.playVideo();
});

socket.on('pause', (timecode) => {
  player.seekTo(timecode, true);
  player.pauseVideo();
});

// I never emit this signal as of yet
socket.on('seek', (timecode) => {
  player.seekTo(timecode, true);
});

socket.on('url', (url) => {
  player.loadVideoById(url);
});
