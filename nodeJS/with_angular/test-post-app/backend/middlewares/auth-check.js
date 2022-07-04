const jwt = require("jsonwebtoken");
const authCheck = (req, res, next) => {
  try {
    console.log("auth check");
    // console.log(req.headers)
    // console.log(req.headers.authorization)
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "secret");
    console.log(decodedToken);
    req.userData = {
      email: decodedToken.email,
      userId: decodedToken.userId,
    };

    next();
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = authCheck;
