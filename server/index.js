const express = require('express');
const escapeInput = require('./escapeInput.js');
const fs = require('fs');
const emojis = require('./emojis.js');
const path = require('path');

const port = 3000;

const app = express();

const rooms = {};

const idMaker = () => {
  const validChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let id = '';
  for (let i = 0; i < 6; i++) {
    id += validChars[Math.floor(Math.random() * validChars.length)];
  }
  if (rooms[id]) {
    return idMaker();
  }
  rooms[id] = true;
  return id;
}

const dudFunction = () => {
  return;
};

const populateEmojiPicker = (emojis) => {
  let htmlContent = fs.readFileSync('indexTemplate.html', 'utf-8');
  let emojiDivs = '';
  for (let emoji of emojis) {
    emojiDivs += `\n<div class="emoji">${emoji}</div>`
  }
  htmlContent = htmlContent.replace(`<div id='emoji-picker'></div>`, `<div id='emoji-picker'>${emojiDivs}</div>`);
  fs.writeFileSync('./public/index.html', htmlContent, 'utf-8');
};

populateEmojiPicker(emojis);

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

const server = app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});

const io = require('socket.io')(server);

io.on('connection', (socket) => {
  let room;
  let password;
  socket.on('message', (message) => {
    message.body = escapeInput(message.body);
    console.log('a message came through');
    console.log('and room is: ' + room);
    socket.to(room).broadcast.emit('message', message);
  });
  socket.on('signin', (username, roomid, code) => {
    console.log('about to sign them in');
    if (code === rooms[roomid].password) {
      console.log('signin confirmed');
      room = roomid;
      socket.join(roomid);
      socket.emit('message', {user: 'Valet', body: `Welcome, ${username}. May I take your coat?`});
      socket.to(roomid).broadcast.emit('message', {user: 'Valet', body: `${username} has entered the ballroom`});
      console.log('room is: ' + room);
    }
  })
  socket.on('play', (timecode) => {
    console.log('play command received!');
    socket.to(room).broadcast.emit('play', timecode);
  });
  socket.on('pause', (timecode) => {
    console.log('pause command received!');
    socket.to(room).broadcast.emit('pause', timecode);
  });
  socket.on('url', (url) => {
    console.log('new url received!');
    socket.to(room).broadcast.emit('url', url);
  });
  socket.on('room', (code) => {
    console.log('new room signal created');
    const newId = idMaker();
    rooms[newId] = {password: code, users: {}};
    password = code;
    socket.join(room);
    socket.emit('new-room', newId, code);
    console.log('newId is: ' + newId);
    console.log('number of rooms is: ' + Array.from(Object.entries(rooms)));
  })
});

module.exports = idMaker;