const express = require('express')
const router = express.Router()
const Post = require("../models/post");
const bodyParser = require('body-parser')

const jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get("", (req, res, next) => {
    Post.find().then(data => {
        res.status(200).json(data)
    }) 
 })
 
 router.get("/:id", (req, res, next) => {
 
 })
 
 router.post("", jsonParser, (req, res, next) => {
     console.log(req.body)
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    })
    post.save().then((data) => {
        res.status(201).json(data)
    })
 })
 
 router.delete("/:id", (req, res, next) => {
 
 })
 
 router.put("/:id", (req, res, next) => {
 
 })

module.exports = router