const express = require('express')
const router = express.Router()
const Post = require('../models/post')
router.get("", (req, res, next) => {
  Post.find().then((result) => {
    res.status(200).json(result);
  });
});

module.exports = router