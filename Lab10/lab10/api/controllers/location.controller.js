const { ReplSet } = require("mongodb");
const mongoose = require("mongoose");
const Job = mongoose.model("Job");

const _addLocation = function (req, res, job) {
  console.log("inside _addLocation");
  console.log(req.body.address);
  console.log(req.body.lng);
  console.log(req.body.lat);
  job.location.address = req.body.address;
  console.log(job.location.coordinates);

  job.save(function (err, job) {
    console.log("upadated job ", job); // to check if the game has an attribute publisher
    const response = {
      status: 200,
      message: job,
    };
    if (err) {
      console.log("Error saving location");
      response.status = 500;
      response.message = err;
    }
    res.status(response.status).json(response.message);
  });
};

// module.exports.locationGetOne = function (req, res) {
//   console.log("GetOne publisher request received");
//   const gameId = req.params.gameId;
//   Job.findById(gameId)
//     .select("publisher")
//     .exec(function (err, game) {
//       res.status(200).json(game.publisher);
//     });
// };
module.exports.locationAddOne = function (req, res) {
  console.log("POST new Location");
  console.log(req.body);
  const jobId = req.params.jobId;
  Job.findById(jobId).exec(function (err, job) {
    const response = {
      status: 200,
      message: job,
    };
    if (err) {
      console.log("Error creating job");
      response.status = 500;
      response.message = err;
    } else if (!job) {
      console.log("Error creating location");
      response.status = 404;
      response.message = { message: "Job id not found" };
    }
    if (job) {
      console.log("Job is ", job);
      _addLocation(req, res, job);
    } else {
      res.status(response.status).json(response.message);
    }
  });
};
// module.exports.publisherFullUpdateOne = function (req, res) {
//   console.log("GetOne publisher request received");
//   const gameId = req.params.gameId;
//   Game.findById(gameId).exec(function (err, game) {
//     if (err) {
//       res.status(500).message(err);
//     } else if (!game) {
//       res.status(404).json({ message: "Game ID  not found" });
//     }
//     if (game) {
//       game.publisher.name = req.body.name;
//       game.publisher.address = req.body.address;
//       game.save(function (err, updatedGame) {
//         if (err) {
//           res.status(500).json(err);
//         } else {
//           res.status(204).json(updatedGame.publisher);
//         }
//       });
//     }
//   });
// };

// module.exports.publisherDeleteOne = function (req, res) {
//   console.log("DeleteOne publisher request received");
//   const gameId = req.params.gameId;
//   Game.findById(gameId).exec(function (err, game) {
//     if (err) {
//       res.status(500).message(err);
//     } else if (!game) {
//       res.status(404).json({ message: "Game ID  not found" });
//     }
//     if (game) {
//       game.publisher.remove();
//       game.save(function (err, updatedGame) {
//         if (err) {
//           res.status(500).json(err);
//         } else {
//           res.status(204).json(updatedGame.publisher);
//         }
//       });
//     }
//   });
// };
