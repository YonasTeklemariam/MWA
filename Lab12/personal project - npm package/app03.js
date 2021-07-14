const express = require("express");
const path = require("path");
require("./api/data/db");
const router = require("./api/routes");
const logger = require("./api/data/logger");

const app = express();

app.set("port", 3000);

// app.use(function (req, res, next) {
//   console.log(req.method, req.url);
//   next();
// });

app.use("/node_modules", express.static(path.join(__dirname, "node_modules")));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ extended: false }));

app.use((req, res, next) => {
  logger.info(req.body);
  let oldSend = res.send;
  res.send = function (data) {
    logger.info(JSON.parse(data));
    oldSend.apply(res, arguments);
  };
  next();
});

app.use("/api", router);

// const server = app.listen(app.get("port"), function () {
//   console.log("Listening to port ", server.address().port);
// });
const server = app.listen(app.get("port"), () => {
  // logger.log("info", `server up and running on port: ${server.address().port}`);
  logger.error(`server up and running on port: ${server.address().port}`);
});
