const express = require("express");
const bodyParser = require("body-parser");

var jsonParser = bodyParser.json();
const app = express();

let posts = [
  { id: "1", title: "tom", content: "jack" },
  { id: "2", title: "tom", content: "jack" },
  { id: "3", title: "tom", content: "jack" },
];

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, PUT, OPTIONS"
  );
  next();
});

app.post("/posts", jsonParser, (req, res, next) => {    
  posts.push(req.body);

  res.status(201).json(posts);
});

app.get("/posts", (req, res, next) => {
  res.json(posts);
});

module.exports = app;
