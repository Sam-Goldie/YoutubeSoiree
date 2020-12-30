const React = require('react');
const socket = io('http://localhost:80');
// import PropTypes from 'prop-types';
const UrlSubmission = require('./UrlSubmission.jsx');
const ChatContainer = require('./ChatContainer.jsx');
const ChatInput = require('./ChatInput.jsx');
const VideoDisplay = require('./VideoDisplay.jsx');

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
    this.setState({
      messages: [...this.state.messages, {
        user: this.state.currentUser,
        body: document.getElementById('message-input').value,
      }],
    });
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
        <VideoDisplay url={this.state.url} />
        <ChatInput addMessage={this.addMessage.bind(this)} />
        <ChatContainer messages={this.state.messages}/>
      </div>
    );
  }
}

socket.on('message', (data) => {
  console.log(data);
});

module.exports = App;
