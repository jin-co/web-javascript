const jwt = require('jsonwebtoken')

const authCheck = (req, res, next) => {
  console.log('auth check')
  try {
    const token = req.headers.authorization.split(' ')[1]
    const decodedToken = jwt.verify(token, "secret")
    req.userData = {
      email: decodedToken.email,
      userId: decodedToken.userId
    }    
    next()
  } catch (error) {
    res.status(400).json(error)
  }
}

module.exports = authCheck