var mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  address: String,
  coordinates: {
    //longitude(E/W), latitude(N/S)
    type: [Number],
    index: "2dsphere",
  },
});

const jobSeachingSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  salary: Number,
  description: String,
  experience: String,
  postDate: String,
  skills: [String],
  location: locationSchema,
});

mongoose.model("Job", jobSeachingSchema, "jobSearch");

// mongoose.model("Game",gameSchema, "games").......the 3rd parameter is optional, it is the name of the collection. otherwise it will declare it itself taking the plural of the schema which is "Game" -> games
