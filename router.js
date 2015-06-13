var express = require('express');
var router = express.Router();

var auth = require('./routes/auth');
var users = require('./routes/users');
var products = require('./routes/products');

router.use('/users', users);
router.use('/products', products);

module.exports = function(passport) {
  router.use('/auth', auth(passport));

  return router;
};
