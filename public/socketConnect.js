// turns out, iframes keep track of time data more granularly than seconds. implement greater precision of playback sync when you have time

// const newMessage = document.createElement('div');
// newMessage.append(`Me  ${addedMessage.body}`);
// const chatContainer = document.getElementById('chat-container');
// chatContainer.append(newMessage);
// chatContainer.scrollBy(0, chatContainer.scrollHeight);

socket.on('message', (data, sessionId) => {
  console.log(`data is: ${data}`);
  console.log(`sessionId is ${sessionId}`);
  const newMessage = document.createElement('div');
  newMessage.append(`${data.user}:  ${data.body}`);
  const chatContainer = document.getElementById('chat-container');
  chatContainer.append(newMessage);
  chatContainer.scrollBy(0, chatContainer.scrollHeight);
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

socket.on('join', () => {
  console.log('someone just joined!');
  player.pauseVideo();
  socket.emit('pause', player.getCurrentTime());
});
