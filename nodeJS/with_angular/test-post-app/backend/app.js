const express = require("express");
const app = express();

app.use((req, res, next) => {
  res.setHeader("Allow-Control-Access-Origin", "*");
  res.setHeader(
    "Allow-Control-Access-Headers",
    "Origin, X-Requested-With, Content-Type ,Accept"
  );
  res.setHeader(
    "Allow-Control-Access-Methods",
    "PUT, PATCH, DELETE, POST, GET, OPTIONS"
  );

  next();
});

app.use(express.json())

const mongose = require('mongoose')

app.get((req, res, next) => {
  
})

module.exports = app;
