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
  let fetchedUser;
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json("user not found");
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, use.password);
    })
    .then((result) => {
      if (!result) {
        return res.status(401).json("password wrong");
      }
      const token = jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser._id },
        "secret",
        { expiresIn: "1h" }
      );
    })
    .res.status(200)
    .json({ token: token, expiresIn: 3600 });
});

module.exports = router;
