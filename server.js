
var fs = require('fs');
var path = require('path');

// var routes = require('./routes');

// server.on('request', app);
var express = require('express')
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
// var mongoose = require('mongoose');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'browser')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));



var chatData = [];
var users = {}

io.on('connection', function (socket) {
  io.emit('data', chatData, socket.id)
    users[socket.id]='Anonymous Hater'
        socket.emit('users', users)



    console.log('A new client has connected!');
    console.log(socket.id);
  io.emit('userJoin')  

  socket.on('chat message', function(msg){
    chatData.push({user:msg.user, msg:msg.msg})
    users[socket.id]=msg.user
    io.emit('users', users)
    io.emit('chat message', msg);
    console.log('message: ' +msg.id, msg.msg, msg.user );
  });
  
  socket.on('disconnect', function () {
    var disMsg={msg:users[socket.id]+' has left the Hate Arena.',user:''}
	    console.log(socket.id+' has disconnected! :(');
      io.emit('userLeave', disMsg )
      delete users[socket.id]
	});



});
app.get('/', function (req, res) {
    res.sendFile('index.html');
});

http.listen(3000, function(){
  console.log('listening on port 1337');
});