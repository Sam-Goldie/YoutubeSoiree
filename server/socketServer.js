const app = require('http').createServer();

const io = require('socket.io')(app);

console.log('hello there this is socket server!');

const server = io.listen(80);

server.on('connect', (socket) => {
  console.log('Connected');
  socket.emit('message', 'hello there');
});
