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
  let newVideoId = document.getElementById('submit-input').value;
  document.getElementById('submit-input').value = '';
  newVideoId = newVideoId.substring(newVideoId.lastIndexOf('/') + 1);
  if (newVideoId.includes('?')) {
    newVideoId = newVideoId.substring(newVideoId.lastIndexOf('?') + 3);
  }
  if (newVideoId.includes('&')) {
    newVideoId = newVideoId.substring(0, newVideoId.indexOf('&'));
  }
  socket.emit('url', newVideoId);
  player.loadVideoById(newVideoId);
};

document.getElementById('message-input').addEventListener('keyup', function(event) {
  if (event.key === 'Enter') {
    document.getElementById('message-submit').click();
  }
});

document.getElementById('message-submit').onclick = () => {
  const messageBox = document.getElementById('message-input');
  const newText = messageBox.value;
  if (newText === '') {
    return;
  }
  messageBox.value = '';
  const addedMessage = {
    user: username,
    body: newText,
  };
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
  const bottomElement = jQuery(chatContainer.getElementsByTagName('div')[chatContainer.getElementsByTagName('div').length - 1]);
  if (bottomElement.length) {
    if (bottomElement.offset().top <= chatContainer.offsetTop + chatContainer.offsetHeight) {
      chatContainer.append(displayMessage);
      chatContainer.scrollTo(0, chatContainer.scrollHeight);
    }
  }
  chatContainer.append(displayMessage);
};