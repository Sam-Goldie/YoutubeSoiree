const React = require('react');
const Message = require('./Message.jsx');

const ChatContainer = ({ messages }) => {
  if (messages.length > 0) {
    return messages.map((message) => (
      <Message message={message} />
    ));
  }
  return null;
};

module.exports = ChatContainer;
