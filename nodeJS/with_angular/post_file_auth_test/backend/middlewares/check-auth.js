const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
      const token = req.headers.authorization.split(' ')[1]
      jwt.verify(token, "secret")
      next()
  } catch(err) {
    res.status(403).json("middleware error: ", err)
  }
  // const header = req.headers['authorization']
  // const token = authorization && authorization.split(' ')[1]
  // if(!token) return res.sendStatus(401)
  // jwt.verify(token, "secret", (err, user) => {
  //     if(err) return res.sendStatus(403)
  //     req.user = user
  //     next()
  // })
};
