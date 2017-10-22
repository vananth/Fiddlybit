var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var OSC = require('osc-js');
var port = process.env.PORT || 3000;
// gibbs = require('./gibber.audio.lib.min.js')

const osc = new OSC( { plugin: new OSC.WebsocketServerPlugin() } );
osc.open() // listening on 'ws://localhost:8080'

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});