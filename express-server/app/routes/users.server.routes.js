var users = require('../../app/controllers/users.server.controller');
var express = require('express');
var router = express.Router();

module.exports = function (app) {
  app.get('/users', users.requiresLogin, users.list);
  app.post('/', users.create);

  app.route('/users/:userId')
    .get(users.read)
    .put(users.update)
    .delete(users.delete);

  app.param('userId', users.userByID);

  app.post('/signin', users.authenticate);
  app.get('/signout', users.signout);
  app.get('/read_cookie', users.isSignedIn);
  app.get('/welcome', users.welcome);

};