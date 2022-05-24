const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {    
  try {

    console.log('auth check: ')    
    console.log(req.headers)    
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, "secret")
    console.log('auth check token: ')    
    console.log(token)   
    console.log('auth check verify: ')    
    console.log(jwt.verify(token, "secret"))   
    next();
  } catch (error) {
    res.status(401).json(error);
  }
};
