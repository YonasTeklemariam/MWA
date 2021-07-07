const express = require("express");
const controllerPremierLeague = require("../controllers/ukTeams.controller");
const controllerTeams = require("../controllers/team.controller");

const router = express.Router();

router
  .route("/premierLeague")
  .get(controllerPremierLeague.teamsGetAll)
  .post(controllerPremierLeague.teamsAddOne);

router
  .route("/premierLeague/:teamId")
  .get(controllerPremierLeague.teamsGetOne)
  .put(controllerPremierLeague.teamsFullUpdateOne)
  .patch(controllerPremierLeague.teamsPartialUpdateOne)
  .delete(controllerPremierLeague.teamsDeleteOne);

router
  .route("/premierLeague/:teamId/teamList/:memberId")
  .get(controllerTeams.squadGetOne)
  // .put(controllerTeams.squadFullUpdateOne)
  .delete(controllerTeams.squadDeleteOne);

router
  .route("/premierLeague/:teamId/teamList")
  .get(controllerTeams.squadGetAll)
  .post(controllerTeams.squadAddOne);

module.exports = router;
