var app = require('./app');
var io = require('./io');
var http = require('http').Server(app);

io(http);

var server = http.listen(process.env.PORT || 3000, function() {
  console.log('Express server listening on port ' + server.address().port);
});
