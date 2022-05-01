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

app.get("/posts", (req, res, next) => {
  res.json(posts);
});

app.post("/posts", jsonParser, (req, res, next) => {
  console.log(req.body);
  posts.push(req.body);
  //   this.posts.push(post);

  res.status(202).json({ message: "added" });
});
module.exports = app;
