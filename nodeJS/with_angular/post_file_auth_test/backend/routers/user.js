const express = require("express");
const router = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

router.post("/login", (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      console.log(hash);
      const user = new User({
        email: req.body.email,
        password: hash,
      });

      user
        .save()
        .then((result) => {
          res.status(200).json(result);
        })
        .catch((err) => res.status(500).json(err));
    })
    .catch((err) => res.status(500).json(err));
});

router.post("/login", (req, res, next) => {


module.exports = router;
