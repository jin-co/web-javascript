const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    console.log('verify ', req.headers.authorization)  
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "secret");
    console.log('decoded ', decodedToken)
    req.userData = {
      email: decodedToken.email,
      userId: decodedToken.userId
    }
    next();
  } catch (error) {
    res.status(401).json("error");
  }
};
