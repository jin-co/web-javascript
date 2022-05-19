const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  console.log(req.body
    .authorization)
  try {
    const token = req.header.authorization.split(" ")[1];
    console.log('check auth backend:', token)
    jwt.verify(token, "secret_code");
    next()
  } catch(error) {
    console.log('try failed: ', error)
    res.status(400).json("middle auth failed");
  }
};
