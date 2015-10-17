var express = require('express');
var crud = require('./crud');
var Product = require('../models/product');

var router = express.Router();

crud.getAll(router, Product, 'products', {
  transformQuery: function(query) {
    return {
      name: query.search
    };
  }
});
crud.get(router, Product, 'product');
crud.post(router, Product, 'product');
crud.put(router, Product, 'product');
crud.delete(router, Product);

module.exports = router;
