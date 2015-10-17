var lodash = require('lodash');
var crud = require('../repositories/crud');

var assign = lodash.assign;

function deleteVersion(model) {
  if (model) {
    if (Array.isArray(model)) {
      model = model.map(deleteVersion);
    } else {
      model = model.toObject();
      delete model.__v;
    }
  }
  return model;
}

module.exports = {
  findAll: function(Model, query, callback) {
    crud.find(Model, query, function(err, models) {
      callback(err, deleteVersion(models));
    });
  },
  findOne: function(Model, query, callback) {
    crud.find(Model, query, function(err, models) {
      if (err) {
        callback(err);
      } else if (models.length > 1) {
        callback('more than one found');
      } else {
        callback(err, deleteVersion(models[0]));
      }
    });
  },
  _findById: function(Model, id, callback) {
    crud.findById(Model, id, callback);
  },
  findById: function(Model, id, callback) {
    this._findById(Model, id, function(err, model) {
      callback(err, deleteVersion(model));
    });
  },
  save: function(model, hash, callback) {
    assign(model, hash);
    crud.save(model, function(err, model) {
      callback(err, deleteVersion(model));
    });
  },
  remove: function(model, callback) {
    crud.remove(model, callback);
  },

  findOneOrCreate: function(Model, query, hash, callback) {
    this.findOne(Model, query, function(err, model) {
      if (err || model) {
        callback(err, model);
      } else {
        this.save(new Model(), hash, callback);
      }
    }.bind(this));
  },
  saveIfExists: function(Model, id, hash, callback) {
    this._findById(Model, id, function(err, model) {
      if (err) {
        callback(err);
      } else if (model) {
        this.save(model, hash, callback);
      } else {
        callback('not found');
      }
    }.bind(this));
  },
  removeIfExists: function(Model, id, callback) {
    this._findById(Model, id, function(err, model) {
      if (err) {
        callback(err);
      } else if (model) {
        this.remove(model, callback);
      } else {
        callback('not found');
      }
    }.bind(this));
  }
};
