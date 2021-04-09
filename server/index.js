const express = require('express');
const socketIO = require('socket.io');
const escapeInput = require('./escapeInput.js');
const path = require('path');
const bodyParser = require('body-parser');

const port = 3000;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, '../dist')));

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

