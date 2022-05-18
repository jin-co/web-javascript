const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt"); // encrypts the user info
const jwt = require("jsonwebtoken"); // creates token
const User = require("../models/user");
const bodyParser = require("body-parser");
const user = require("../models/user");
const jsonParser = bodyParser.json();

router.post("/signup", (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash,
      });
      user.save().then((data) => {
        res.status(201).json("Added");
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.post((req, res, next) => {
  User.find({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json("User not found");
      }
      return bcrypt.compare(req.body.password, user.password);
    })
    .then((result) => {
      if (!result) {
        return res.status(401).json("Password mismatch");
      }
      const token = jwt.sign(
        { email: user.email, userId: user._id },
        "secret_code",
        { expiresIn: "1h" }
        // token is stored in the front so set the expire as short as possible
      );
    })
    .catch((err) => {
      return res.status(401).json({ error: err });
    });
});

module.exports = router;
