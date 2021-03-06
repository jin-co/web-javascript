const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // try {
  //   const token = req.headers.authorization.split(' ')[1];
  //   jwt.verify(token, "secret")
  //   next();
  // } catch (error) {
  //   res.status(401).json(error);
  // }

  
  // console.log('check auth header: ', req.headers)
  // console.log('check auth header auth: ', req.headers.authorization)
  // console.log('check auth body: ', req.body)
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log("check auth backend:", token);
    const decodedToken = jwt.verify(token, "secret_code");
    req.userData = {email: decodedToken.email, userId: decodedToken.userId}
    next();
  } catch (error) {
    console.log("try failed: ", error);
    res.status(400).json("middle auth failed");
  }

  // jwt.verify(token, "secret_code", (err, user) => {
  //   if(err) return res.sendStatus(403)
  //   req.user = user
  //   next()
  // })

  // const header = req.headers["authorization"];
  // const token = authorization && authorization.split(" ")[1];
  // if (!token) return res.sendStatus(401);
  // jwt.verify(token, "secret", (err, user) => {
  //   if (err) return res.sendStatus(403);
  //   req.user = user;
  //   next();
  // });
};
