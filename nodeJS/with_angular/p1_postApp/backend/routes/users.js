const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt"); // encrypts the user info
const jwt = require("jsonwebtoken"); // creates token
const User = require("../models/user");
const bodyParser = require("body-parser");
const user = require("../models/user");
const jsonParser = bodyParser.json();

// router.post("/signup", (req, res, next) => {
//   bcrypt
//     .hash(req.body.password, 10)
//     .then((hash) => {
//       const user = new User({
//         email: req.body.email,
//         password: hash,
//       });
//       user
//         .save()
//         .then((data) => {
//           res.status(201).json("Added");
//         })
//         .catch((err) => {
//           res.status(500).json({ message: err });
//         });
//     })
//     .catch((err) => {
//       res.status(500).json({ error: err });
//     });
// });

// router.post("/login", (req, res, next) => {
//   let fetchedUser;
//   User.findOne({ email: req.body.email })
//     .then((user) => {
//       if (!user) {
//         return res.status(401).json("User not found");
//       }
//       fetchedUser = user;
//       console.log("front ps", req.body.password);
//       console.log("back ps", user.password);
//       return bcrypt.compare(req.body.password, user.password);
//     })
//     .then((result) => {
//       console.log("result", result);
//       if (!result) {
//         return res.status(401).json("Password mismatch");
//       }
//       const token = jwt.sign(
//         { email: fetchedUser.email, userId: fetchedUser._id },
//         "secret_code",
//         { expiresIn: "1h" }
//         // token is stored in the front so set the expire as short as possible
//       );
//       res
//         .status(200)
//         .json({ token: token, expiresIn: 3600, userId: fetchedUser._id });
//     })
//     .catch((err) => {
//       return res.status(401).json({ error: err });
//     });
// });
const UserController = require('../controller/user')
router.post("/signup", UserController.createUser)
router.post("/login", UserController.login)
module.exports = router;
