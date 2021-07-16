const { ReplSet } = require("mongodb");
const mongoose = require("mongoose");
const Game = mongoose.model("Game");

const _addPublisher = function(req, res, game){
    console.log("inside _addPublisher")
    console.log(req.body.name);
    console.log(req.body.address);
    game.publisher.name = req.body.name;
    game.publisher.address = req.body.address;
    
    // game.publisher.location.address = req.body.address;
    // game.publisher.location.coordinates = [parseFloat(req.body.lng), parseFloat(req.body.lat)];
    game.save(function(err, game){
        console.log("upadated game ", game); // to check if the game has an attribute publisher
        const response = {
            status: 200,
            message: game
          };
          if (err) {
            console.log("Error saving publisher");
            response.status = 500;
            response.message = err;
          }
          res.status(response.status).json(response.message);
    })
}


module.exports.publisherGetOne = function(req, res){
    console.log("GetOne publisher request received");
    const gameId = req.params.gameId;
    Game.findById(gameId).select("publisher").exec(function(err, game){
        res.status(200).json(game.publisher);
    });
}
module.exports.publisherAddOne = function (req, res) {
    console.log("POST new Publisher");
    console.log(req.body);
    const gameId = req.params.gameId;
    Game.findById(gameId).exec(function(err, game){
        const response = {
            status: 200,
            message: game,
          };
          if (err) {
            console.log("Error creating game");
            response.status = 500;
            response.message = err;
          } else if(!game){
              console.log("Error creating publisher");
              response.status = 404;
              response.message = {"message": "Game id not found"};
          }
          if(game){
              console.log("Game is ", game);
              _addPublisher(req, res, game);
          }else{
            res.status(response.status).json(response.message);
          }          
        }     
  )};
  module.exports.publisherFullUpdateOne = function(req, res){
    console.log("GetOne publisher request received");
    const gameId = req.params.gameId;
    Game.findById(gameId).exec(function(err, game){
        if(err){
            res.status(500).message(err);
        } else if(!game){
            res.status(404).json({"message": "Game ID  not found"});
        }
        if(game){
            game.publisher.name = req.body.name;
            game.publisher.address = req.body.address;
            game.save(function(err, updatedGame){
                if(err){
                    res.status(500).json(err);
                }else{
                    res.status(204).json(updatedGame.publisher);
                }
            });
        }
    });
}

module.exports.publisherDeleteOne = function(req, res){
    console.log("DeleteOne publisher request received");
    const gameId = req.params.gameId;
    Game.findById(gameId).exec(function(err, game){
        if(err){
            res.status(500).message(err);
        } else if(!game){
            res.status(404).json({"message": "Game ID  not found"});
        }
        if(game){
            game.publisher.remove();
            game.save(function(err, updatedGame){
                if(err){
                    res.status(500).json(err);
                }else{
                    res.status(204).json(updatedGame.publisher);
                }
            });
        }
    });
}