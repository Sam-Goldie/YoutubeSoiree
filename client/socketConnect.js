socket.on('message', (data) => {
  console.log(`data is: ${data}`);
  const newMessage = document.createElement('div');
  newMessage.append(`${data.user}  ${data.body}`);
  document.getElementById('chat-container').append(newMessage);
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
