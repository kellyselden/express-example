var express = require('express');
var User = require('../models/user');

var router = express.Router();

function deleteVersion(user) {
  user = user.toObject();
  delete user.__v;
  return user;
}

router.get('/', function(req, res) {
  return User.find(function(err, users) {
    if (err) return console.error(err);
    return res.send({
      users: users.map(deleteVersion)
    });
  });
});

router.post('/', function(req, res) {
  // var user = new User({
  //   name: req.body.product.name,
  //   type: req.body.product.type,
  //   isPublic: req.body.product.isPublic
  // });
  // return product.save(function(err) {
  //   if (err) return console.error(err);
  //   return res.send({
  //     product: deleteVersion(product)
  //   });
  // });
});

router.get('/:id', function(req, res) {
  return User.findById(req.params.id, function(err, user) {
    if (err) return console.error(err);
    return res.send({
      user: deleteVersion(user)
    });
  });
});

router.put('/:id', function(req, res) {
  // return User.findById(req.params.id, function(err, product) {
  //   if (product) {
  //     product.name = req.body.product.name;
  //     product.type = req.body.product.type;
  //     product.isPublic = req.body.product.isPublic;
  //     return product.save(function(err) {
  //       if (err) return console.error(err);
  //       return res.send({
  //         product: deleteVersion(product)
  //       });
  //     });
  //   }
  // });
});

router.delete('/:id', function(req, res) {
  return User.findById(req.params.id, function(err, user) {
    if (user) {
      return user.remove(function(err) {
        if (err) return console.error(err);
        return res.send({});
      });
    }
  });
});

module.exports = router;
