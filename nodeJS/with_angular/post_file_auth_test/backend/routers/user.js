const express = require("express");
const router = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

router.post("", (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      console.log("hash: ", hash);
      const user = new User({
        email: req.body.email,
        password: hash,
      });
      user.save().then((result) => {
        res.status(200).json();
      });
    })
    .catch((err) => {        
      res.status(500).json(err);
    });
});

module.exports = router;
