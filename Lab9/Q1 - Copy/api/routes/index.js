const express = require("express");
const controllerGames = require("../controllers/games.controller");
const controllerPublishers = require("../controllers/publisher.controller");

const router = express.Router();

router
  .route("/games")
  .get(controllerGames.gamesGetAll)
  .post(controllerGames.gamesAddOne);

router.route("/games/:gameId")
.get(controllerGames.gamesGetOne)
.put(controllerGames.gamesFullUpdateOne)
.patch(controllerGames.gamesPartialUpdateOne)
.delete(controllerGames.gamesDeleteOne);

router.route("/games/:gameId/publishers/:publisherId")
.get(controllerPublishers.publisherGetOne)
.put(controllerPublishers.publisherFullUpdateOne)
.delete(controllerPublishers.publisherDeleteOne);


router.route("/games/:gameId/publishers")
.post(controllerPublishers.publisherAddOne)

module.exports = router;
