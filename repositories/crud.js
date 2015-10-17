module.exports = {
  find: function(Model, query, callback) {
    var criteria = {};
    Object.keys(query).forEach(function(key) {
      criteria[key] = new RegExp(query[key], 'i');
    });
    Model.find(criteria, callback);
  },
  findById: function(Model, id, callback) {
    Model.findById(id, callback);
  },
  save: function(model, callback) {
    model.save(callback);
  },
  remove: function(model, callback) {
    model.remove(callback);
  }
};
