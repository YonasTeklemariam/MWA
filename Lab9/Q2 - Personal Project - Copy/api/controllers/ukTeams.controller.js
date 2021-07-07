const mongoose = require("mongoose");
mongoose.set("debug", true);

const Team = mongoose.model("england");
// const Squad = Team.squadList;

module.exports.teamsGetAll = function (req, res) {
  console.log("JSON request received");
  let offset = 0;
  let count = 8;
  const maxCount = 12;
  if (req.query && req.query.offset) {
    offset = parseInt(req.query.offset);
  }
  if (req.query && req.query.count) {
    count = parseInt(req.query.count);
  }

  // hardening
  if (isNaN(offset) || isNaN(count)) {
    res.status(400).json({ message: "Query offset or count is not a number" });
    return;
  }

  if (count > maxCount) {
    count = maxCount;
    res.status(400).json({ message: "cannot exceed count of " + maxCount });
  }

  console.log("offset ", offset, " count ", count);

  Team.find()
    .skip(offset)
    .limit(count)
    .exec(function (err, team) {
      if (err) {
        console.log("Error finding teams", err);
        res.status(500).json(err);
      } else {
        console.log("Found squad", team);
        res.status(200).json(team);
      }
    });
};

module.exports.teamsGetOne = function (req, res) {
  console.log("GetOne request received");
  const teamId = req.params.teamId;
  Team.findById(teamId).exec(function (err, team) {
    const response = {
      status: 200,
      message: team,
    };
    if (err) {
      console.log("Error finding team");
      response.status = 500;
      response.message = err;
    } else if (!team) {
      response.status = 400;
      response.message = { message: "Team ID not found" };
    }
    res.status(response.status).json(response.message);
  });
};

module.exports.teamsAddOne = function (req, res) {
  console.log("POST new team");
  console.log(req.body);
  const newTeam = {
    name: req.body.name,
    country: req.body.country,
    city: req.body.city,
    league: req.body.league,
    dateEstablished: req.body.dateEstablished,
    stadiumName: req.body.stadiumName,
    netWorth: req.body.netWorth,
    squadList: [],
  };

  Team.create(newTeam, function (err, team) {
    const response = {
      status: 200,
      message: team,
    };
    if (err) {
      console.log("Error creating team");
      response.status = 500;
      response.message = err;
    }
    res.status(response.status).json(response.message);
  });
};

module.exports.teamsFullUpdateOne = function (req, res) {
  console.log("FullUpdate request received");
  const teamId = req.params.teamId;

  if (teamId.length !== 24) {
    res
      .status(400)
      .json({ message: "RequestParam teamId is not a parameter range " });
  }

  Team.findById(teamId).exec(function (err, team) {
    const response = {
      status: 204, // update
      message: team,
    };
    if (err) {
      console.log("Error finding team");
      response.status = 500;
      response.message = err;
    } else if (!team) {
      response.status = 400;
      response.message = { message: "Team ID not found" };
    }
    if (response.status !== 204) {
      res.status(response.status).json(response.message);
    } else {
      // this is where i will update the game, no problem occured so update the game
      (team.name = req.body.name),
        (team.country = req.body.country),
        (team.city = req.body.city),
        (team.league = req.body.league),
        (team.dateEstablished = req.body.dateEstablished),
        (team.stadiumName = req.body.stadiumName),
        (team.netWorth = req.body.netWorth),
        (team.squadList = []);

      team.save(function (err, updatedTeam) {
        if (err) {
          response.status = 500;
          response.message = err;
        } else {
          response.message = updatedTeam;
        }
        res.status(response.status).json(response.message);
      });
    }
  });
};

module.exports.teamsPartialUpdateOne = function (req, res) {
  console.log("partialUpdate request received");
  const teamId = req.params.teamId;

  Team.findById(teamId).exec(function (err, team) {
    const response = {
      status: 204, // update
      message: team,
    };
    if (err) {
      console.log("Error finding team");
      response.status = 500;
      response.message = err;
    } else if (!team) {
      response.status = 400;
      response.message = { message: "team ID not found" };
    }
    if (response.status !== 204) {
      res.status(response.status).json(response.message);
    } else {
      // this is where i will update the game, no problem occured so update the game
      if (req.body.name) {
        team.name = req.body.name;
      }
      if (req.body.country) {
        team.country = req.body.country;
      }
      if (req.body.city) {
        team.city = req.body.city;
      }
      if (req.body.league) {
        team.league = req.body.league;
      }
      if (req.body.dateEstablished) {
        team.dateEstablished = req.body.dateEstablished;
      }
      if (req.body.stadiumName) {
        team.stadiumName = req.body.stadiumName;
      }
      if (req.body.netWorth) {
        team.netWorth = req.body.netWorth;
      }
      if (req.body.squadList) {
        team.squadList = [];
      }

      team.save(function (err, updatedTeam) {
        if (err) {
          response.status = 500;
          response.message = err;
        } else {
          response.message = updatedTeam;
        }
        res.status(response.status).json(response.message);
      });
    }
  });
};

module.exports.teamsDeleteOne = function (req, res) {
  console.log("DeleteOne request received");
  const teamId = req.params.teamId;
  Team.findByIdAndDelete(teamId).exec(function (err, deletedTeam) {
    const response = {
      status: 204,
      message: deletedTeam,
    };
    if (err) {
      console.log("Error finding team");
      response.status = 500;
      response.message = err;
    } else if (!deletedTeam) {
      response.status = 404;
      response.message = { message: "Team ID not found" };
    }
    res.status(response.status).json(response.message);
  });
};
