const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.header.authorization.split(" ")[1];
    console.log(token)
    jwt.verify(token, "secret_code");
    next()
  } catch {
    res.status(400).json("middle auth failed");
  }
};
