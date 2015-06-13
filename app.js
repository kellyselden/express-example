var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var router = require('./router');
var mongoose = require('./mongoose');
var passport = require('./passport');

var app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

var passport = require('./passport')(app);

app.use('/api/v1', router(passport));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

mongoose.connect();

module.exports = app;
