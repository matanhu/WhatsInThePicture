const express = require('express');
const http = require('http');
const path = require('path');
const socket = require('socket.io');

const appRoutes = require('./server/Routes');

const app = express();

app.use('/api', appRoutes);

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'))
});

const port = process.env.PORT || '3001';

app.set('port', port);

const server = http.createServer(app);

const io = socket(server);

// socket.io connection
io.on('connection', (socket) => {
  console.log("Connected to Socket!!"+ socket.id);
  // Receiving nextImage from client
  socket.on('newImage', (newImage) => {
    console.log('newImage: '+ JSON.stringify(newImage));
    socket.broadcast.emit('newImage', newImage);
  });
});

server.listen(port, () => console.log('Running'));
