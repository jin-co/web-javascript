const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // console.log('check auth header: ', req.headers)
  // console.log('check auth header auth: ', req.headers.authorization)
  // console.log('check auth body: ', req.body)
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log('check auth backend:', token)
    jwt.verify(token, "secret_code");
    next()
  } catch(error) {
    console.log('try failed: ', error)
    res.status(400).json("middle auth failed");
  }

  // jwt.verify(token, "secret_code", (err, user) => {
  //   if(err) return res.sendStatus(403)
  //   req.user = user
  //   next()
  // })
};
