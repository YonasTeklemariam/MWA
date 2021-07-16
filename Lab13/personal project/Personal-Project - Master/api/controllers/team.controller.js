const { ReplSet } = require("mongodb");
const mongoose = require("mongoose");
const Team = mongoose.model("england");

const _addSquad = function (req, res, team) {
  console.log("inside _addPublisher");
  console.log(req.body);

  const squadMember = {
    name: req.body.name,
    age: parseInt(req.body.age),
    nationality: req.body.nationality,
    position: req.body.position,
    jerseyNumber: parseInt(req.body.jerseyNumber),
  };

  console.log("the new squad member is: ", squadMember);

  team.squadList.push(squadMember);

  team.save(function (err, team) {
    console.log("upadated team ", team); // to check if the game has an attribute publisher
    const response = {
      status: 200,
      message: team,
    };
    if (err) {
      console.log("Error saving team");
      response.status = 500;
      response.message = err;
    }
    res.status(response.status).json(response.message);
  });
};

module.exports.squadGetAll = function (req, res) {
  console.log("GetOne squad request received");
  const teamId = req.params.teamId;
  Team.findById(teamId)
    .select("squadList")
    .exec(function (err, team) {
      res.status(200).json(team.squadList);
    });
};

module.exports.squadGetOne = function (req, res) {
  console.log("GetOne squad request received");
  const teamId = req.params.teamId;
  const memberId = req.params.memberId;
  Team.findById(teamId)
    .select("squadList")
    .exec(function (err, team) {
      const response = {
        status: 200,
        message: team.squadList.id(memberId),
      };
      if (err) {
        console.log("Error 1 getting member");
        res.status(500).json(err);
      } else {
        res.status(response.status).json(response.message);
      }
    });
};

module.exports.squadDeleteOne = function (req, res) {
  console.log("GetOne squad request received");
  const teamId = req.params.teamId;
  const memberId = req.params.memberId;
  Team.findById(teamId)
    .select("squadList")
    .exec(function (err, team) {
      team.squadList.pull(memberId);

      team.save(function (err, team) {
        console.log("upadated team ", team); // to check if the game has an attribute publisher
        const response = {
          status: 200,
          message: team,
        };
        if (err) {
          console.log("Error saving team");
          response.status = 500;
          response.message = err;
        }
        res.status(response.status).json(response.message);
      });
    });
};

module.exports.squadAddOne = function (req, res) {
  console.log("POST new Squad");
  console.log(req.body);
  const teamId = req.params.teamId;
  Team.findById(teamId).exec(function (err, team) {
    const response = {
      status: 200,
      message: team,
    };
    if (err) {
      console.log("Error creating squadList");
      response.status = 500;
      response.message = err;
    } else if (!team) {
      console.log("Error creating squadList");
      response.status = 404;
      response.message = { message: "Team id not found" };
    }
    if (team) {
      console.log("Team is ", team);
      _addSquad(req, res, team);
    } else {
      res.status(response.status).json(response.message);
    }
  });
};
// module.exports.squadFullUpdateOne = function (req, res) {
//   console.log("squadFullUpdateOne request received");
//   const teamId = req.params.teamId;
//   Team.findById(teamId).exec(function (err, team) {
//     if (err) {
//       res.status(500).message(err);
//     } else if (!team) {
//       res.status(404).json({ message: "Team ID  not found" });
//     }
//     if (team) {
//       team.publisher.name = req.body.name;
//       team.publisher.address = req.body.address;
//       team.save(function (err, updatedGame) {
//         if (err) {
//           res.status(500).json(err);
//         } else {
//           res.status(204).json(updatedGame.publisher);
//         }
//       });
//     }
//   });
// };

// module.exports.squadDeleteOne = function (req, res) {
//   console.log("DeleteOne squad request received");
//   const teamId = req.params.teamId;
//   Team.findById(teamId).exec(function (err, team) {
//     if (err) {
//       res.status(500).message(err);
//     } else if (!team) {
//       res.status(404).json({ message: "Team ID  not found" });
//     }
//     if (team) {
//       team.teamMembers.remove();
//       team.save(function (err, updatedTeam) {
//         if (err) {
//           res.status(500).json(err);
//         } else {
//           res.status(204).json(updatedTeam.teamMembers);
//         }
//       });
//     }
//   });
// };
