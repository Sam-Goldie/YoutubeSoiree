const React = require('react');
// import PropTypes from 'prop-types';
const UrlSubmission = require('./UrlSubmission.jsx');
const ChatContainer = require('./ChatContainer.jsx');
const VideoDisplay = require('./VideoDisplay.jsx');

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      url: 'https://www.youtube.com/embed/IY9YNF5MMQo',
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
        {/* <ChatContainer /> */}
      </div>
    );
  }
}

module.exports = App;
