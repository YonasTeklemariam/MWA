const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = mongoose.model("User");

module.exports.register = function (req, res) {
  console.log("Controller Register");

  bcrypt.hash(req.body.password, 10, function (err, hashedPassword) {
    if (!err) {
      const newUser = {
        username: req.body.username,
        password: hashedPassword,
        name: req.body.name,
      };
      console.log("1");

      User.create(newUser, function (err, user) {
        if (err) {
          console.log("Error", err);
          res.status(500).json(err);
        } else {
          console.log("User created");
          res.status(201).json(user);
        }
      });
    }
  });
};

module.exports.login = function (req, res) {
  console.log("Controller Login");
  const userName = req.body.username;
  const password = req.body.password;
  User.findOne({ username: userName }).exec(function (err, user) {
    console.log("find user", user);
    if (err) {
      console.log("Error", err);
      res.status(500).json(err);
    }
    if (user) {
      bcrypt.compare(password, user.password, function (err, result) {
        if (err) {
          console.log("Error", err);
          res.status(500).json(err);
        } else {
          if (result) {
            console.log("user found", user);
            const token = jwt.sign({ name: user.name }, "cs572", {
              expiresIn: 3600,
            });
            res.status(200).json({ success: true, token: token });
          } else {
            console.log("password incorrect", user);
            res.status(400).json({ message: "Unauthorized" });
          }
        }
      });
    } else {
      console.log("User not found", user);
      res.status(400).json({ message: "Unauthorized" });
    }
  });
};

module.exports.authenticate = function (req, res, next) {
  const headerExists = req.headers.authorization;
  if (headerExists) {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, "cs572", function (err, decodedToken) {
      if (err) {
        console.log("jwt verify error");
        res.status(401).json({ message: "Unauthorized" });
      } else {
        next();
      }
    });
  } else {
    res.status(403).json({ message: "Token missing" });
  }
};
