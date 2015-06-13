var User = require('../models/user');
var fs = require('fs');

var host = fs.readFileSync('host', 'utf8');

module.exports = function(passport, provider) {
  var Strategy = require('passport-' + provider).Strategy;

  var client = fs.readFileSync(provider, 'utf8').split('\n');

  passport.use(new Strategy({
      clientID: client[0],
      clientSecret: client[1],
      callbackURL: host + '/api/v1/auth/' + provider + '/callback'
    },
    function(accessToken, refreshToken, profile, done) {
      console.log('create user');
      var conditions = { };
      conditions[provider + 'Id'] = profile.id;
      User.findOne(conditions, function(err, user) {
        if (err) {
          return done(err);
        }
        if (user) {
          return done(err, user);
        }

        conditions.name = profile.displayName;
        conditions.email = profile.emails[0].value;
        conditions.username = profile.username;
        (user = new User(conditions)).save(function(err) {
          if (err) {
            return done(err);
          }

          return done(err, user);
        });
      });
    }
  ));
};
