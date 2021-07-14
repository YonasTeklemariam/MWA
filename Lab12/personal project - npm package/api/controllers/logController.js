const mongoose = require("mongoose");

const Log = mongoose.model("Log");

module.exports.logsGetAll = function (req, res) {
  console.log("JSON request received");
  let offset = 0;
  let count = 7;
  const maxCount = 10;
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

  Log.find()
    .skip(offset)
    .limit(count)
    .exec(function (err, logs) {
      if (err) {
        console.log("Error finding logs", err);
        res.status(500).json(err);
      } else {
        console.log("Found logs", logs);
        res.status(200).json(logs);
      }
    });
};
