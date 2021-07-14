const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
  timestamp: Date,
  level: String,
  message: String,
});

mongoose.model("Log", logSchema, "SystemLogger");
