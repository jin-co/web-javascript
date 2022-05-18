const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

router.post("/signup", (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      console.log(hash);
      const user = new User({
        email: req.body.email,
        password: hash,
      });
      user.save().then((data) => {
        res.status(200).json("added");
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.post("/login", (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        return res.status(401).json("No such user");
      }
      return bcrypt.compare(req.body.password, user.password);
    })
    .then((result) => {
      if (!result) {
        return res.status(401).json("wrong password");
      }
      const token = jwt.sign({ email: user.email, userId: user._id }, "code", {
        expiresIn: "1h",
      });
      res.status(200).json(token)
    })
    .catch((err) => {
      res.status(401).json({ error: err });
    });
});
module.exports = router;
