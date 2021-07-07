var mongoose = require("mongoose");

const publisherSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: true,
  },
  address:{
    type: String,
  } 
  // location: {
  //   address: String,
  //   coordinates: {
  //     //longitude(E/W), latitude(N/S)
  //     type: [Number],
  //     index: "2dsphere",
  //   },
  // },
});

const gamesSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  price: Number,
  year: Number,
  minPlayers: {
    type: Number,
    min: 1,
    max: 10,
  },
  maxPlayers: {
    type: Number,
    min: 1,
    max: 10,
  },
  minAge: {
    type: Number,
    min: 4,
  },
  rate: {
    type: Number,
    min: 1,
    max: 5,
    default: 1,
  },
  designer: [String],
  publisher: publisherSchema,
});

mongoose.model("Game", gamesSchema, "games");

// mongoose.model("Game",gameSchema, "games").......the 3rd parameter is optional, it is the name of the collection. otherwise it will declare it itself taking the plural of the schema which is "Game" -> games
