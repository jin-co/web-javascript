const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.header.authorization.split(" ")[1];
  } catch {
      res.statue(400).json("middle auth failed")
  }
};
