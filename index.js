var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var OSC = require('osc-js');
var port = process.env.PORT || 3000;
// gibbs = require('./gibber.audio.lib.min.js')

  const osc = new OSC({
    plugin: new OSC.DatagramPlugin({ send: { port: 4559, host: '127.0.0.1' } })
  });

  // const osc = new OSC( { plugin: new OSC.WebsocketServerPlugin() } );
  osc.open() // listening on 'ws://localhost:8080'


app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');

});

io.on('connection', function(socket){
  console.log('a user connected');
  console.log(socket.id);
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    io.emit('chat message', msg);
    if (msg == "60" || msg == "70" || msg == "80"){
      const message = new OSC.Message('/play_this', parseInt(msg));
      osc.send(message);
    }
  });

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});