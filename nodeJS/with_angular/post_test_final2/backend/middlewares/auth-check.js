const jwt = require("jsonwebtoken");

const check = (req, res, next) => {
  console.log("auth check")
  console.log(req.headers)
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, 'secret')
    req.userData = { email: decodedToken.email, userId: decodedToken.userId };
    next();
  } catch (error) {
    console.log('auth check error: ', error)
    res.status(400).json(error);
  }
};

module.exports = check;
