const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/signup", (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new User({
      email: req.body.email,
      password: hash,
    });
    user
      .save()
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  });
});

router.post("/login", (req, res, next) => {  
  let fetchedUser;
  User.findOne({ email: req.body.email })
    .then((user) => {      
      if (!user) {
        res.status(400).json("user not found");
      }      
      fetchedUser = user;      
      return bcrypt.compare(req.body.password, user.password);
    })
    .then((result) => {      
      if (!result) {
        res.status(400).json("wrong password");
      }
      const token = jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser._id },
        "secret",
        { expiresIn: "1h" }
      );
      res.status(200).json({ token: token, exp: 3600 });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

module.exports = router;
