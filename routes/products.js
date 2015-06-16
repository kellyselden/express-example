var express = require('express');
var url = require('url');
var Product = require('../models/product');

var router = express.Router();

function deleteVersion(product) {
  product = product.toObject();
  delete product.__v;
  return product;
}

var pageSize = 10;

router.get('/', function(req, res) {
  var criteria = {};
  var query = url.parse(req.url, true).query;
  var search = query['search'];
  if (search)
    criteria['name'] = new RegExp(search, 'i');
  return Product.find(criteria, function(err, products) {
    if (err) return console.error(err);
    var page = query['page'] || 0;
    var startIndex = page * pageSize;
    return res.send({
      products: products.sort(function(a, b) {
        return a.name > b.name ? 1 : a.name < b.name ? -1 : 0;
      }).slice(startIndex, startIndex + pageSize).map(deleteVersion),
      meta: {
        count: products.length
      }
    });
  });
});

router.post('/', function(req, res) {
  var product = new Product({
    name: req.body.product.name,
    type: req.body.product.type,
    isPublic: req.body.product.isPublic
  });
  return product.save(function(err) {
    if (err) return console.error(err);
    return res.send({
      product: deleteVersion(product)
    });
  });
});

router.get('/:id', function(req, res) {
  return Product.findById(req.params.id, function(err, product) {
    if (err) return console.error(err);
    return res.send({
      product: deleteVersion(product)
    });
  });
});

router.put('/:id', function(req, res) {
  return Product.findById(req.params.id, function(err, product) {
    if (product) {
      product.name = req.body.product.name;
      product.type = req.body.product.type;
      product.isPublic = req.body.product.isPublic;
      return product.save(function(err) {
        if (err) return console.error(err);
        return res.send({
          product: deleteVersion(product)
        });
      });
    }
  });
});

router.delete('/:id', function(req, res) {
  return Product.findById(req.params.id, function(err, product) {
    if (product) {
      return product.remove(function(err) {
        if (err) return console.error(err);
        return res.send({});
      });
    }
  });
});

module.exports = router;
