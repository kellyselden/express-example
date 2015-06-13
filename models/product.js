var mongoose = require('mongoose');

module.exports = mongoose.model('Product', new mongoose.Schema({
  name: { type: String, required: true, index: { unique: true } },
  type: { type: String, required: true, enum: ['first', 'second'] },
  isPublic: Boolean
}/*, { autoIndex: false }*/));
