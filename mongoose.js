var mongoose = require('mongoose');
var fs = require('fs');

var connectionstring = fs.readFileSync('connectionstring', 'utf8');

module.exports.connect = function() {
  mongoose.connect(connectionstring);
};
