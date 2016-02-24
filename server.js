
var fs = require('fs');
var path = require('path');


var express = require('express')
var app = require('express')();
var http = require('http').Server(app);

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'browser')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));

app.get('/', function (req, res) {
    res.sendFile('index.html');
});

http.listen(3000, function(){
  console.log('listening on port 1337');
});