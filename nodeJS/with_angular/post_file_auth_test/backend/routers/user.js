const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.post("/user", (req, res, next) => {
  const user = new User({
    email: req.body.email,
    password: req.body.password,
  });
  user.save().then((result) => {
    res.status(200).json();
  });
});

module.exports = router