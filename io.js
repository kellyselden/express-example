var socket = require('socket.io');
var fs = require('fs');

var version = fs.readFileSync('./version', 'utf8').split('\n');

module.exports = function(http) {
  var io = socket(http);

  io.on('connection', function(socket) {
    socket.on('save', function(msg) {
      socket.broadcast.emit('save', msg);
    });
    socket.on('remove', function(msg) {
      socket.broadcast.emit('remove', msg);
    });
  });

  setInterval(function() {
    io.sockets.emit('version', version[1]);
  }, 10000);
};
