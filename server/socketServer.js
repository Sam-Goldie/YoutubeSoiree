const io = require('socket.io')(80);

io.on('connection', (socket) => {
  socket.emit('message', 'Welcome!');
});

// const app = require('http').createServer();

// const io = require('socket.io')(app);

// console.log('hello there this is socket server!');

// const server = io.listen(80);

// server.on('connection', (socket) => {
//   console.log('Connected');
//   socket.emit('message', 'hello there');
// });
