const express = require("express");
const controllerGames = require("../controllers/games.controller");
const controllerPublishers = require("../controllers/publisher.controller");
const controllerUsers = require("../controllers/users.controller");

const router = express.Router();

router
  .route("/games")
  .get(controllerGames.gamesGetAll)
  .post(controllerUsers.authenticate, controllerGames.gamesAddOne);

router
  .route("/games/:gameId")
  .get(controllerGames.gamesGetOne)
  .put(controllerUsers.authenticate, controllerGames.gamesFullUpdateOne)
  .patch(controllerUsers.authenticate, controllerGames.gamesPartialUpdateOne)
  .delete(controllerUsers.authenticate, controllerGames.gamesDeleteOne);

router
  .route("/games/:gameId/publishers/:publisherId")
  .get(controllerPublishers.publisherGetOne)
  .put(
    controllerUsers.authenticate,
    controllerPublishers.publisherFullUpdateOne
  )
  .delete(
    controllerUsers.authenticate,
    controllerPublishers.publisherDeleteOne
  );

router
  .route("/games/:gameId/publishers")
  .post(controllerUsers.authenticate, controllerPublishers.publisherAddOne);

// Users routes

router.route("/users").post(controllerUsers.register);

router.route("/users/login").post(controllerUsers.login);

module.exports = router;
