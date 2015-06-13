var express = require('express');
var auth = require('./oauth2');

var router = express.Router();

module.exports = function(passport) {
  auth(router, passport, 'github');
  auth(router, passport, 'facebook');

  return router;
};
