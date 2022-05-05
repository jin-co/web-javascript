const express = require("express");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

const mongoose = require('mongoose')
const postSchema = mongoose.Schema({
    _id:String,
    title:String,
    content:String
})
const dbURL = 'mongodb+srv://1234:1234@cluster0.yz15b.mongodb.net/posts?retryWrites=true&w=majority'
const Post = mongoose.model("Post", postSchema)
mongoose.connect(dbURL).then(() => console.log('connected')).catch(() => console.log('failed'))


const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Header",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "POST, GET, PUT, FETCH, OPTIONS, DELETE"
  );
  next()
});

app.use((req, res, next) => {
    res.send('up')
})

app.get("/posts", (req, res, next) => {

})

module.exports = app
