const express = require("express");
const User = require("../models/user");
const router = express.Router();

router.post("/signup", (req, res, next) => {
  const user = new User({
    email: req.body.email,
    password: req.body.password,
  });
  user.save().then((result) => {
    res.status(200).json(result)
  }).catch((err) => {
    res.status(401).json(err)
  });
});

module.exports = router