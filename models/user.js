var mongoose = require('mongoose');
 
module.exports = mongoose.model('User', {
  name: String,
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  facebookId: String,
  githubId: String
});
