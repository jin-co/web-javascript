const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt"); // encrypts the user info
const User = require("../models/user");

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

module.exports = router;
