import './socketConnect.js';
import findColor from './findColor.js';

let username;
let userColor;

document.getElementById('username-submit').onclick = () => {
  const newUsername = document.getElementById('username-entry').value;
  if (newUsername !== '') {
    username = newUsername;
    document.getElementById('username-modal').style.display = 'none';
    userColor = findColor(newUsername);
  }
}

document.getElementById('url-submit').onclick = () => {
  console.log('IM INSIDE CHANGEVIDEO!');
  let newVideoId = document.getElementById('submit-input').value;
  console.log(`heres newVideoId initial value: ${newVideoId}`);
  document.getElementById('submit-input').value = '';
  newVideoId = newVideoId.substring(newVideoId.lastIndexOf('/') + 1);
  if (newVideoId.includes('?')) {
    newVideoId = newVideoId.substring(newVideoId.lastIndexOf('?') + 3);
  }
  if (newVideoId.includes('&')) {
    newVideoId = newVideoId.substring(0, newVideoId.indexOf('&'));
  }
  console.log(`the newURL is: ${newVideoId}`);
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

document.getElementById('message-input').addEventListener('keyup', function(event) {
  if (event.key === 'Enter') {
    document.getElementById('message-submit').click();
  }
});

// onclick={window.changeVideo}
document.getElementById('message-submit').onclick = () => {
  const messageBox = document.getElementById('message-input');
  const newText = messageBox.value;
  if (newText === '') {
    return;
  }
  messageBox.value = '';
  console.log('heres the newText: ' + newText);
  const addedMessage = {
    user: username,
    body: newText,
  };
  console.log(`heres the new message: ${addedMessage}`);
  socket.emit('message', addedMessage);
  const displayMessage = document.createElement('div');
  displayMessage.setAttribute('class', 'message');
  const displayName = document.createElement('div');
  displayName.setAttribute('class', addedMessage.user);
  displayName.setAttribute('class', 'chat-text username');
  displayName.style.color = userColor;
  displayName.append(`${addedMessage.user}:  `);
  const chatContainer = document.getElementById('chat-container');
  const displayBody = document.createElement('div');
  displayBody.setAttribute('class', 'chat-text');
  displayBody.append(`  ${addedMessage.body}`);
  displayMessage.append(displayName);
  displayMessage.append(displayBody);
  if (jQuery(chatContainer.getElementsByTagName('div')[chatContainer.getElementsByTagName('div').length - 1]).offset().top <= chatContainer.offsetTop + chatContainer.offsetHeight) {
    chatContainer.append(displayMessage);
    chatContainer.scrollTo(0, chatContainer.scrollHeight);
  }
  chatContainer.append(displayMessage);
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
