const express = require("express");
const app = express();

let posts = [
    {id:'1', title:'a', content:'good'},
    {id:'2', title:'b', content:'good'},
    {id:'3', title:'c', content:'good'}
]

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, OPTIONS, DELETE"
  );
  next();
});

app.get('/posts', (req, res, next) => {
  res.json({
      message:'posts',
      posts: posts
  })
});

module.exports = app;
