import './socketConnect.js';
import findColor from './findColor.js';
import autoscrollChat from './autoscrollChat.js';

let username;
let userColor;
let room;
let password;

document.getElementById('username-submit').onclick = () => {
  const newUsername = document.getElementById('username-entry').value;
  const code = document.getElementById('password-entry').value;
  if (newUsername !== '') {
    username = newUsername;
    userColor = findColor(username);
    const usp = new URLSearchParams(document.location.search);
    room = usp.get('id');
    password = code;
    console.log('this is room: ' + room);
    socket.emit('signin', newUsername, room, code);
  }
}

document.getElementById('url-submit').onclick = () => {
  let newVideoId = document.getElementById('submit-input').value;
  if (newVideoId === '') {
    return;
  }
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

document.getElementById('create-room').onclick = () => {
  console.log('room created!');
  socket.emit('room', document.getElementById('new-password').value);
}

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
  autoscrollChat();
};

document.getElementById('new-password').onclick = (event) => {
  event.target.value = '';
  document.getElementById('new-password').style.color = 'black';
  document.getElementById('new-password').style.fontStyle = 'normal';
  document.getElementById('new-password').onclick = null;
};

Array.from(document.getElementsByClassName('emoji')).forEach((event) => {
  event.addEventListener('click', (e) => {
    document.getElementById('message-input').value += e.currentTarget.innerText;
    document.getElementById('message-input').focus();
  })
});
