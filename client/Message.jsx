import React from 'react';
import './style.css';

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

export default Message;
