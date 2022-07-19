const express = require('express')
const Post = require('../models/post')
const router = express.Router()

router.get("", (req, res, next) => {  
  Post.find().then(result => {
    res.status(200).json(result)
  })
})

module.exports = router