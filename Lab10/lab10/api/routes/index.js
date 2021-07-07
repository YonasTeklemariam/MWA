const express = require("express");
const controllerJobs = require("../controllers/jobs.controller");
const controllerLocations = require("../controllers/location.controller");
// const controllerUsers = require("../controllers/users.controller");

const router = express.Router();

router
  .route("/jobs")
  .get(controllerJobs.jobGetAll)
  .post(controllerJobs.jobsAddOne);

router
  .route("/jobs/:jobId")
  .get(controllerJobs.jobsGetOne)
  .put(controllerJobs.jobsFullUpdateOne)
  .patch(controllerJobs.jobsPartialUpdateOne)
  .delete(controllerJobs.jobsDeleteOne);

// router
//   .route("/games/:gameId/publishers/:publisherId")
//   .get(controllerPublishers.publisherGetOne)
//   .put(controllerPublishers.publisherFullUpdateOne)
//   .delete(controllerPublishers.publisherDeleteOne);

router.route("/jobs/:jobId/locations").post(controllerLocations.locationAddOne);

// Users routes

// router.route("/users").post(controllerUsers.register);

// router.route("/users/login").post(controllerUsers.login);

module.exports = router;
