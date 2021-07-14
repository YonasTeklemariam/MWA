const { createLogger, transports, format } = require("winston");
require("winston-mongodb");

const dbName = "meanGames";
var dbURL = "mongodb://localhost:27017/" + dbName;

const logger = createLogger({
  transports: [
    new transports.File({
      filename: "info.log",
      level: "info",
      format: format.combine(format.timestamp(), format.json()),
    }),
    new transports.MongoDB({
      db: dbURL,
      options: { useUnifiedTopology: true },
      collection: "SystemLogger",
      format: format.combine(format.timestamp(), format.json()),
    }),
  ],
});

module.exports = logger;
