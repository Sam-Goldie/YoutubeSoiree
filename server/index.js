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
console.log(htmlContent);
htmlContent = htmlContent.replace('<emoji-picker></emoji-picker>',
`<script nonce=${newNonce}>
    import { Picker } from 'emoji-picker-element';
    const picker = new Picker();
    document.body.appendChild(picker);
</script>`
);
htmlContent = htmlContent.replace(`default-src 'self'`, `default-src 'self' nonce-${newNonce}`);
console.log(htmlContent);
fs.writeFileSync('./public/index.html', htmlContent, 'utf-8');

app.use(express.static('public'));

const server = app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});

const io = socketIO(server);

io.on('connection', (socket) => {
  socket.emit('message', 'HELLO');
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

