const express = require("express");
const bodyParser = require("body-parser");

var jsonParser = bodyParser.json();
const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, OPTIONS, DELETE, PUT"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  next();
});

app.get("/posts", (req, res, next) => {
  const post = [
    { id: "1", title: "tom", content: "jack" },
    { id: "2", title: "tom", content: "jack" },
    { id: "3", title: "tom", content: "jack" },
  ];

  res.json(post);
});

module.exports = app;
