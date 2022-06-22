const express = require('express')
const router = express()
const User = require('../models/auth')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

router.post("/signup", (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const user = new User ({
      email: req.body.email,
      password: hash
    })
  
    user.save().then(result => {
      res.status(200).json(result)
    }).catch(error => {
      res.status(400).json(error)
    })
  })  
})

router.post("/login", (req, res, next) => {
  
})

module.exports = router