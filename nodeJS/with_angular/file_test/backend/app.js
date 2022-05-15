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
    "GET, PUT, DELETE, FETCH, POST, OPTIONS"
  );
  next()
});

app.use((req, res, next) => {
    res.send('hhh')
})

module.exports = app
