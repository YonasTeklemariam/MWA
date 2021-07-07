const mongoose = require("mongoose");

const Job = mongoose.model("Job");

module.exports.jobGetAll = function (req, res) {
  console.log("JSON request received");
  let offset = 0;
  let count = 20;
  const maxCount = 20;
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

  Job.find()
    .skip(offset)
    .limit(count)
    .exec(function (err, jobs) {
      if (err) {
        console.log("Error finding jobs", err);
        res.status(500).json(err);
      } else {
        console.log("Found jobs", jobs);
        res.status(200).json(jobs);
      }
    });
};

module.exports.jobsGetOne = function (req, res) {
  console.log("GetOne request received");
  const jobId = req.params.jobId;
  Job.findById(jobId).exec(function (err, job) {
    const response = {
      status: 200,
      message: job,
    };
    if (err) {
      console.log("Error finding job");
      response.status = 500;
      response.message = err;
    } else if (!job) {
      response.status = 400;
      response.message = { message: "Job ID not found" };
    }
    res.status(response.status).json(response.message);
  });
};

module.exports.jobsAddOne = function (req, res) {
  console.log("POST new Job");
  console.log(req.body);
  const newJob = {
    title: req.body.title,
    salary: parseFloat(req.body.salary),
    description: req.body.description,
    experience: req.body.experience,
    postDate: req.body.postDate,
    skills: [],
    location: {
      address: req.body.address,
      coordinates: [parseFloat(req.body.lat), parseFloat(req.body.lng)],
    },
  };
  if (req.body.skills) {
    const skill = req.body.skills;
    const words = skill.split(",");
    for (const word of words) {
      newJob.skills.push(word);
    }
  }

  console.log("the new job is " + newJob);

  Job.create(newJob, function (err, job) {
    const response = {
      status: 200,
      message: job,
    };
    if (err) {
      console.log("Error creating job");
      response.status = 500;
      response.message = err;
    }
    res.status(response.status).json(response.message);
  });
};

module.exports.jobsFullUpdateOne = function (req, res) {
  console.log("FullUpdate request received");
  const jobId = req.params.jobId;

  if (jobId.length !== 24) {
    res
      .status(400)
      .json({ message: "RequestParam jobId is not a parameter range " });
  }

  Job.findById(jobId).exec(function (err, job) {
    const response = {
      status: 204, // update
      message: job,
    };
    if (err) {
      console.log("Error finding job");
      response.status = 500;
      response.message = err;
    } else if (!job) {
      response.status = 400;
      response.message = { message: "Job ID not found" };
    }
    if (response.status !== 204) {
      res.status(response.status).json(response.message);
    } else {
      // this is where i will update the game, no problem occured so update the game
      (job.title = req.body.title),
        (job.salary = parseFloat(req.body.salary)),
        (job.description = req.body.description),
        (job.experience = req.body.experience),
        (job.postDate = req.body.postDate),
        (job.skills = job.skills),
        (job.location = job.location);
      job.save(function (err, updatedJob) {
        if (err) {
          response.status = 500;
          response.message = err;
        } else {
          response.message = updatedJob;
        }
        res.status(response.status).json(response.message);
      });
    }
  });
};

module.exports.jobsPartialUpdateOne = function (req, res) {
  console.log("partialUpdate request received");
  const jobId = req.params.jobId;

  Job.findById(jobId).exec(function (err, job) {
    const response = {
      status: 204, // update
      message: job,
    };
    if (err) {
      console.log("Error finding job");
      response.status = 500;
      response.message = err;
    } else if (!job) {
      response.status = 400;
      response.message = { message: "Job ID not found" };
    }
    if (response.status !== 204) {
      res.status(response.status).json(response.message);
    } else {
      // this is where i will update the game, no problem occured so update the game
      if (req.body.title) {
        job.title = req.body.title;
      }
      if (req.body.salary) {
        job.salary = parseFloat(req.body.salary);
      }
      if (req.body.description) {
        job.description = req.body.description;
      }
      if (req.body.experience) {
        job.experience = req.body.experience;
      }
      if (req.body.postDate) {
        job.postDate = req.body.postDate;
      }

      job.save(function (err, updatedJob) {
        if (err) {
          response.status = 500;
          response.message = err;
        } else {
          response.message = updatedJob;
        }
        res.status(response.status).json(response.message);
      });
    }
  });
};

module.exports.jobsDeleteOne = function (req, res) {
  console.log("DeleteOne request received");
  const jobId = req.params.jobId;
  Job.findByIdAndDelete(jobId).exec(function (err, deletedJob) {
    const response = {
      status: 204,
      message: deletedJob,
    };
    if (err) {
      console.log("Error finding job");
      response.status = 500;
      response.message = err;
    } else if (!deletedJob) {
      response.status = 404;
      response.message = { message: "Job ID not found" };
    }
    res.status(response.status).json(response.message);
  });
};
