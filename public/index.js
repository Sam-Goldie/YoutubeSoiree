import './socketConnect.js';
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
  socket.emit('message', addedMessage);
  const newMessage = document.createElement('div');
  newMessage.append(`Me:  ${addedMessage.body}`);
  const chatContainer = document.getElementById('chat-container');
  chatContainer.append(newMessage);
  chatContainer.scrollBy(0, chatContainer.scrollHeight);
  // if (chatContainer.scrollHeight - chatContainer.scrollTop <= 730) {
  //   chatContainer.scrollBy(0, chatContainer.scrollHeight);
  // }
  // jquery('chat-container').scrollTop(jquery('chat-container')[0].scrollHeight);
  // this.setState({
  //   messages: [...this.state.messages, {
  //     user: this.state.currentUser,
  //     body: newMessage,
  //   }],
  // });
};

// App.propTypes = {
//   url: PropTypes.string,
//   changeVideo: PropTypes.func,
// };

// App.defaultProps = {
//   url: 'https://www.youtube.com/embed/IY9YNF5MMQo',
//   changeVideo,
// };

// render() {
//   console.log(`heres thises changeVideo: ${this.changeVideo}`);
//   return (
//     <div>
//       <UrlSubmission changeVideo={this.changeVideo.bind(this)} />
//       {/* <VideoDisplay url={this.state.url} /> */}
//       <ChatInput addMessage={this.addMessage.bind(this)} />
//       <ChatContainer messages={this.state.messages}/>
//     </div>
//   );
// }

console.log('here i am in app!');

// not exporting anything at the moment
