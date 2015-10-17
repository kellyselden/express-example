var express = require('express');
var crud = require('./crud');
var User = require('../models/user');

var router = express.Router();

crud.getAll(router, User, 'users', {
  searchKeys: ['facebookId']
});
crud.get(router, User, 'user');
crud.post(router, User, 'user');
crud.put(router, User, 'user');
crud.delete(router, User);

module.exports = router;
