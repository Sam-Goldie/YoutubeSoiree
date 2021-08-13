const express = require('express');
const escapeInput = require('./escapeInput.js');
const fs = require('fs');
const emojis = require('./emojis.js');
const { support } = require('jquery');

const port = 3000;

const app = express();

// const nonceMaker = () => {
//   const validChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//   let nonce = '';
//   for (let i = 0; i < 32; i++) {
//     nonce += validChars[Math.floor(Math.random() * validChars.length)];
//   }
//   return nonce;
// }

// const newNonce = nonceMaker();

const populateEmojiPicker = (emojis) => {
  console.log('emoji picker is being populated with this many emojis: ' + emojis.length);
  let htmlContent = fs.readFileSync('indexTemplate.html', 'utf-8');
  let emojiDivs = '';
  for (let emoji of emojis) {
    emojiDivs += `\n<div class="emoji">${emoji}</div>`
  }
  console.log(emojiDivs);
  htmlContent = htmlContent.replace("<div id='emoji-picker'></div>", `<div id='emoji-picker'>${emojiDivs}</div>`);
  console.log('heres the htmlContent: ' + htmlContent);
  fs.writeFileSync('./public/index.html', htmlContent, 'utf-8');
}

populateEmojiPicker(emojis);

app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

const rooms = {};

app.get('/', (req, res) => {
  res.render('index', { rooms });
})

app.get('/:room', (req, res) => {
  res.render('room', { roomName: req.params.room});
})

const server = app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});

const io = require('socket.io')(server);

io.on('connection', (socket) => {
  console.log('connected to client');
  socket.on('message', (message) => {
    message.body = escapeInput(message.body);
    console.log('a message came through');
    console.log(message.body);
    socket.broadcast.emit('message', message);
  });
  socket.on('signin', (username) => {
    socket.emit('message', {user: 'Valet', body: `Welcome, ${username}. May I take your coat?`});
    socket.broadcast.emit('message', {user: 'Valet', body: `${username} has entered the ballroom`})
  })
  socket.on('play', (timecode) => {
    console.log('play command received!');
    socket.broadcast.emit('play', timecode);
  });
  socket.on('pause', (timecode) => {
    console.log('pause command received!');
    socket.broadcast.emit('pause', timecode);
  });
  socket.on('url', (url) => {
    console.log('new url received!');
    socket.broadcast.emit('url', url);
  });
});

