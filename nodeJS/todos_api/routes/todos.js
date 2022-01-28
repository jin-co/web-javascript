// to use this route I have to include this in the main js

var express = require('express')
var router = express.Router()
router.get('/', function(req, res) {
    res.send("hello route")
})

module.exports = router