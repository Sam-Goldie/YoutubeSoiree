const express = require('express');
const socketIO = require('socket.io');

const port = 3000;

const app = express();

app.use(express.static('public'));

const server = app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});

const io = socketIO(server);

io.on('connection', (socket) => {
  console.log('Socket connection made');
});

// app.get('/node_modules/socket.io/client-dist/socket.io.js', (err, res) => {
//   if (err) {
//     console.log(err);
//   }
//   res.status(200).send('../node_modules/socket.io/client-dist/socket.io.js');
// });