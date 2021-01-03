import './socketConnect.js';
console.log('im inside index.js in the client folder');

// let currentVideo = 'https://youtu.be/IY9YNF5MMQo';

// https://youtu.be/LFeJuCYoyfQ

document.getElementById('url-submit').onclick = () => {
  console.log('IM INSIDE CHANGEVIDEO!');
  let newVideoId = document.getElementById('submit-box').value;
  document.getElementById('submit-box').value = '';
  if (newVideoId.includes('watch?v=')) {
    newVideoId = newVideoId.replace('watch?v=', 'embed/');
  } else if (!newVideoId.includes('embed')) {
    newVideoId = `${newVideoId.substring(0, newVideoId.lastIndexOf('/') + 1)}embed/${newVideoId.substring(newVideoId.lastIndexOf('/'))}`;
  }
  if (newVideoId.includes('&')) {
    newVideoId = newVideoId.substring(0, newVideoId.indexOf('&'));
  }
  console.log(`the newURL is: ${newVideoId}`);
  document.getElementsByTagName('iframe')[0].src = newVideoId;
};

// onclick={window.changeVideo}
window.addMessage = () => {
  console.log(`here is the state of messages before adding new one: ${JSON.stringify(this.state.messages)}`);
  const newText = document.getElementById('message-input').value;
  const addedMessage = {
    user: this.state.currentUser,
    body: newText,
  };
  console.log(`heres the new message: ${addedMessage}`);
  socket.emit('message', addedMessage);
  const newMessage = document.createElement('div');
  newMessage.append(`Me  ${addedMessage.body}`);
  document.getElementById('chat-container').append(newMessage);
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
