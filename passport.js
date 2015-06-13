var passport = require('passport');
var session = require('express-session');
var github = require('./strategies/github');
var facebook = require('./strategies/facebook');

module.exports = function(app) {
  app.use(session({
    secret: 'mySecretKey',
    resave: true,
    saveUninitialized: true
  }));
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser(function(user, done) {
    done(null, user);
  });
  passport.deserializeUser(function(obj, done) {
    done(null, obj);
  });

  github(passport);
  facebook(passport);

  return passport;
}
