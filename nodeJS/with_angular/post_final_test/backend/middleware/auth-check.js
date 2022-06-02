const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {  
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, "secret");    
    req.userData = {email: decoded.email, userId: decoded.userId}    
    next();
  } catch {
    res.status(400).json("middle auth failed");
  }
};
