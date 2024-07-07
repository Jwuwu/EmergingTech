const gamelib = require('../controllers/gamelib.server.controller');
const users = require('../../app/controllers/users.server.controller');
const express = require('express');
const router = express.Router();

module.exports = function (app) {
  router.route('/gamelib')
    .get(gamelib.list)
    .post(gamelib.create)
    .get(users.requiresLogin, gamelib.fetchforauth);

  router.route('/gamelib/:gameId')
    .get(gamelib.read)
    .delete(gamelib.deleteById);

  router.param('gameId', gamelib.gameByID);

  app.use(router);
};
