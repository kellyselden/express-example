var request = require('request');
var fs = require('fs');
var User = require('../models/user');
var lodash = require('lodash');
var crud = require('../services/crud');

var pairs = lodash.pairs;

module.exports = function(router, passport, provider) {
  router.post('/' + provider, function(req, res) {
    console.log('post /');
    return res.send({
      user: {}
    });
  });
  router.get('/' + provider + '/callback',
    passport.authenticate(provider), function(req, res) {
    console.log('get /callback');
    return res.redirect('/login?code=' + req.query.code);
  });
  var client = fs.readFileSync(provider, 'utf8').split('\n');
  router.get('/' + provider + '/test', function(req, res) {
    var query = pairs({
      client_id: client[0].trim(),
      client_secret: client[1],
      code: req.query.code
    }).map(function(pair) { return pair.join('=') }).join('&');
    request.post({
      url: 'https://github.com/login/oauth/access_token?' + query,
      headers: {
        Accept: 'application/json'
      }
    }, function(error, response, body) {
      if (error) return console.error(error);
      var token = JSON.parse(body).access_token;
      request({
        url: 'https://api.github.com/user',
        headers: {
          'User-Agent': 'Mongo Node Ember Example',
          Authorization: 'token ' + token
        }
      }, function(error, response, body) {
        if (error) return console.error(error);
        body = JSON.parse(body);
        var githubId = body.id;
        crud.findOneOrCreate(User, {
          githubId: githubId
        }, {
          name: body.name,
          email: body.email,
          githubId: githubId
        }, function(err, user) {
          if (err) return console.error(err);
          res.send(user);
        });
      });
    });
  });
};
