const mongoose = require("mongoose");
require("./games-model");
require("./users-model");

const dbName = "meanGames";

var dbURL = "mongodb://localhost:27017/" + dbName;

mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true }); // with this we are connected to mongodb

mongoose.connection.on("connected", function () {
  console.log("Mongoose connected to " + dbURL);
});

mongoose.connection.on("disconnected", function () {
  console.log("Mongoose disconnected");
});

mongoose.connection.on("error", function (err) {
  console.log("Mongoose connection error " + err);
});

process.on("SIGINT", function () {
  mongoose.connection.close(function () {
    console.log(
      "Send Disconnect to Mongoose because of application termination"
    );
    process.exit(0);
  });
});

process.on("SIGTERM", function () {
  mongoose.connection.close(function () {
    console.log(
      "Send Disconnect to Mongoose because of application termination"
    );
    process.exit(0);
  });
});

process.on("SIGUSR2", function () {
  mongoose.connection.close(function () {
    console.log("Send Disconnect to Mongoose because of application restart");
    process.kill(process.pid, "SIGUSR2");
  });
});
