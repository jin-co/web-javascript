const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    console.log('verify ', req.headers.authorization)  
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, "secret");
    console.log('verify ', token)
    next();
  } catch (error) {
    res.status(401).json("error");
  }
};
