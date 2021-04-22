const express = require('express');
const socketIO = require('socket.io');
const escapeInput = require('./escapeInput.js');
const fs = require('fs');

const port = 3000;

const app = express();

const nonceMaker = () => {
  const validChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let nonce = '';
  for (let i = 0; i < 32; i++) {
    nonce += validChars[Math.floor(Math.random() * validChars.length)];
  }
  return nonce;
}

const newNonce = nonceMaker();

let htmlContent = fs.readFileSync('indexTemplate.html', 'utf-8');
htmlContent = htmlContent.replace("<div id='emoji-script'></div>",
`<script type="module" nonce='${newNonce}' defer src="./createEmojiPicker.js"'>
</script>`
);
htmlContent = htmlContent.replace(`script-src-elem`, `script-src-elem 'nonce-${newNonce}'`);
fs.writeFileSync('./public/index.html', htmlContent, 'utf-8');

app.use(express.static('public'));

const server = app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});

const io = socketIO(server);

io.on('connection', (socket) => {
  console.log('connected to client');
  socket.emit('message', {user: 'server', body: 'HELLO, FRIEND!'});
  socket.on('message', (message) => {
    message.body = escapeInput(message.body);
    console.log('a message came through');
    console.log(message.body);
    socket.broadcast.emit('message', message);
  });
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

