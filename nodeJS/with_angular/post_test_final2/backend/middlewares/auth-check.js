const jwt = require("jsonwebtoken");

const check = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    req.userData = { token: token.token, userId: token.userId };
    next();
  } catch (error) {
    console.log('auth check error: ', error)
    res.status(400).json(error);
  }
};

module.exports = check;
