const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {isRealString} = require('./utils/validation')
const {Users} = require('./utils/users');
const {generateMessage, generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

var users = new Users();
app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('join', (params, callback) => {
     if (!isRealString(params.room) || !isRealString(params.name)) {
       return callback('Display name and room name are both required');
     }

     socket.join(params.room);

     users.remove_user(socket.id);
     users.add_user(socket.id, params.name, params.room);

     io.to(params.room).emit('updateUserList', users.get_user_list(params.room));
     socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
     socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));
     callback();
  });

  socket.on('createMessage', (message, callback) => {
    var user = users.get_user(socket.id)
    if (user && isRealString(message.text)) {
      io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
    }
    callback();
  });

  socket.on('createLocationMessage', (coords) => {
    var user = users.get_user(socket.id)
    if (user) {
      io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
    }
  });

  socket.on('disconnect', () => {
    var user = users.remove_user(socket.id);

    if (user) {
      io.to(user.room).emit('udpateUserlist', users.get_user_list(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left the chat.`));
    }
  });
});

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});

