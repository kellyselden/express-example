module.exports = function(passport) {
  require('./oauth2')(passport, 'github');
};
