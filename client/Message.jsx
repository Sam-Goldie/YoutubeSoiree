const React = require('react');

const Message = ({ message }) => (
  <div className="message">
    <div className="user">
      {message.user}
    </div>
    <div className="body">
      {message.body}
    </div>
  </div>
);

module.exports = Message;
