const express = require('express');
const escapeInput = require('./escapeInput.js');
const fs = require('fs');
const emojis = require('./emojis.js');
const { support } = require('jquery');
const path = require('path');

const port = 3000;

const app = express();

const rooms = {123: 'apple'};

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

// const newNonce = nonceMaker();

const populateEmojiPicker = (emojis) => {
  console.log('emoji picker is being populated with this many emojis: ' + emojis.length);
  let htmlContent = fs.readFileSync('indexTemplate.html', 'utf-8');
  let emojiDivs = '';
  for (let emoji of emojis) {
    emojiDivs += `\n<div class="emoji">${emoji}</div>`
  }
  // console.log(emojiDivs);
  htmlContent = htmlContent.replace("<div id='emoji-picker'></div>", `<div id='emoji-picker'>${emojiDivs}</div>`);
  // console.log('heres the htmlContent: ' + htmlContent);
  fs.writeFileSync('./public/index.html', htmlContent, 'utf-8');
}

populateEmojiPicker(emojis);

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

let queryString;

// app.get('/', (req, res) => {
//   res.render('index', { rooms });
//   queryString = window.location.search;
//   console.log(queryString);
// })

app.get('/room/', (req, res) => {
  console.log('here i am');
  res.sendFile(path.resolve(__dirname, '../public'));
})

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
    // console.log(message.body);
    socket.to(room).broadcast.emit('message', message);
  });
  socket.on('signin', (username, roomid, code) => {
    if (code === rooms[roomid]) {
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
    rooms[idMaker()] = code;
    password = code;
    socket.join(room);
    console.log('number of rooms is: ' + Array.from(Object.keys(rooms)));
  })
});

