const express = require("express");

const app = express();

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

app.use("/posts", (req, res, next) => {
  const posts = [
    {
      id: "1",
      title: "tom",
      content: "jack",
    },
    {
      id: "2",
      title: "tom",
      content: "jack",
    },
    {
      id: "3",
      title: "tom",
      content: "jack",
    },
  ];
  res.json(posts);
});

module.exports = app;
