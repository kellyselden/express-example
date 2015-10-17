var url = require('url');
var crud = require('../services/crud');

module.exports = {
  getAll: function(router, Model, prop, options) {
    router.get('/', function(req, res) {
      var query = url.parse(req.url, true).query;
      var search;
      if (options.searchKeys) {
        search = {};
        options.searchKeys.forEach(function(key) {
          if (query[key] !== undefined) {
            search[key] = query[key];
          }
        });
      } else if (options.transformQuery) {
        search = options.transformQuery(query);
      }
      crud.findAll(Model, search, function(err, models) {
        if (err) return console.error(err);
        var obj = {};
        if (query['page'] !== undefined) {
          var page = (parseInt(query['page'], 10) || 1) - 1;
          var pageSize = parseInt(query['per_page'], 10) || 10;
          var startIndex = page * pageSize;
          var count = models.length;
          models = models.sort(function(a, b) {
            return a.name > b.name ? 1 : a.name < b.name ? -1 : 0;
          }).slice(startIndex, startIndex + pageSize);
          obj.meta = {
            count: count,
            total_pages: Math.ceil(count / pageSize)
          };
        }
        obj[prop] = models;
        res.send(obj);
      });
    });
  },
  get: function(router, Model, prop) {
    router.get('/:id', function(req, res) {
      crud.findById(Model, req.params.id, function(err, model) {
        if (err) return console.error(err);
        var obj = {};
        obj[prop] = model;
        res.send(obj);
      });
    });
  },
  post: function(router, Model, prop) {
    router.post('/', function(req, res) {
      crud.save(new Model(), req.body[prop], function(err, model) {
        if (err) return console.error(err);
        var obj = {};
        obj[prop] = model;
        res.send(obj);
      });
    });
  },
  put: function(router, Model, prop) {
    router.put('/:id', function(req, res) {
      crud.saveIfExists(Model, req.params.id, req.body[prop], function(err, model) {
        if (err) return console.error(err);
        var obj = {};
        obj[prop] = model;
        res.send(obj);
      });
    });
  },
  delete: function(router, Model) {
    router.delete('/:id', function(req, res) {
      crud.removeIfExists(Model, req.params.id, function(err, model) {
        if (err) return console.error(err);
        return res.send({});
      });
    });
  }
};
