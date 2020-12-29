const React = require('react');

const ChatInput = ({ addMessage }) => (
  <div>
    <input id="message-input" />
    <button type="submit" onClick={addMessage}>Send</button>
  </div>
);

module.exports = ChatInput;
