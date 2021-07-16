var mongoose = require("mongoose");

const teamListSchema = new mongoose.Schema({
  name: String,
  age: Number,
  nationality: String,
  position: String,
  jerseyNumber: Number,
});

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  country: String,
  city: String,
  league: String,
  dateEstablished: String,
  stadiumName: String,
  netWorth: String,
  squadList: [teamListSchema],
});

mongoose.model("england", teamSchema, "premierLeague");
mongoose.model("spain", teamSchema, "laLiga");
mongoose.model("italy", teamSchema, "serieA");
mongoose.model("germany", teamSchema, "bundesLiga");
mongoose.model("france", teamSchema, "league1");

// mongoose.model("Game",gameSchema, "games").......the 3rd parameter is optional, it is the name of the collection. otherwise it will declare it itself taking the plural of the schema which is "Game" -> games
