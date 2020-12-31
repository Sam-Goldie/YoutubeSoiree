const React = require('react');
// const io = require('http://cdnjs.cloudflare.com/ajax/libs/socket.io/2.3.0/socket.io.js');
const socket = io('http://localhost:3000');
// import PropTypes from 'prop-types';
const UrlSubmission = require('./UrlSubmission.jsx');
const ChatContainer = require('./ChatContainer.jsx');
const ChatInput = require('./ChatInput.jsx');
// const VideoDisplay = require('./VideoDisplay.jsx');
// const onYoutubeIframeAPIReady = require('./onYoutubeIframeAPIReady.js');

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      url: 'https://www.youtube.com/embed/IY9YNF5MMQo',
      messages: [
        {
          user: 'Sam Goldie',
          body: 'hello, its me!',
        },
      ],
      currentUser: 'Sam Goldie',
    };
  }

  changeVideo() {
    let newURL = document.getElementById('submit-box').value;
    document.getElementById('submit-box').value = '';
    if (newURL.includes('watch?v=')) {
      newURL = newURL.replace('watch?v=', 'embed/');
    }
    if (newURL.includes('&')) {
      newURL = newURL.substring(0, newURL.indexOf('&'));
    }
    console.log(`the newURL is: ${newURL}`);
    this.setState({
      url: newURL,
    });
  }

  addMessage() {
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
  }

  // App.propTypes = {
  //   url: PropTypes.string,
  //   changeVideo: PropTypes.func,
  // };

  // App.defaultProps = {
  //   url: 'https://www.youtube.com/embed/IY9YNF5MMQo',
  //   changeVideo,
  // };

  render() {
    console.log(`heres thises changeVideo: ${this.changeVideo}`);
    return (
      <div>
        <UrlSubmission changeVideo={this.changeVideo.bind(this)} />
        {/* <VideoDisplay url={this.state.url} /> */}
        <ChatInput addMessage={this.addMessage.bind(this)} />
        <ChatContainer messages={this.state.messages}/>
      </div>
    );
  }
}

console.log('here i am in app!');
socket.on('message', (data) => {
  console.log(`data is: ${data}`);
  const newMessage = document.createElement('div');
  newMessage.append(`${data.user}  ${data.body}`);
  document.getElementById('chat-container').append(newMessage);
});

module.exports = App;
