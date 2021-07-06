const express = require("express");
const controllerPremierLeague = require("../controllers/ukTeams.controller");
const controllerTeams = require("../controllers/team.controller");
const controllerUsers = require("../controllers/users.controller");

const router = express.Router();

router
  .route("/premierLeague")
  .get(controllerPremierLeague.teamsGetAll)
  .post(controllerUsers.authenticate, controllerPremierLeague.teamsAddOne);

router
  .route("/premierLeague/:teamId")
  .get(controllerPremierLeague.teamsGetOne)
  .put(controllerUsers.authenticate, controllerPremierLeague.teamsFullUpdateOne)
  .patch(
    controllerUsers.authenticate,
    controllerPremierLeague.teamsPartialUpdateOne
  )
  .delete(controllerUsers.authenticate, controllerPremierLeague.teamsDeleteOne);

router
  .route("/premierLeague/search/:name")
  .post(controllerPremierLeague.searchTeams);

router
  .route("/premierLeague/:teamId/teamList/:memberId")
  .get(controllerTeams.squadGetOne)
  // .put(controllerTeams.squadFullUpdateOne)
  .delete(controllerUsers.authenticate, controllerTeams.squadDeleteOne);

router
  .route("/premierLeague/:teamId/teamList")
  .get(controllerTeams.squadGetAll)
  .post(controllerUsers.authenticate, controllerTeams.squadAddOne);

router.route("/users").post(controllerUsers.register);

router.route("/users/login").post(controllerUsers.login);

module.exports = router;
