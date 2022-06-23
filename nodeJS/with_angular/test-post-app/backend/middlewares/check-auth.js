const jwt = require('jsonwebtoken')

const authCheck = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const decoded = jwt.verify(token, "secret")

    req.userData = {
      token: decoded.email,
      userId: decoded.userId
    }

    next()
    console.log('auth check: ', token)
  } catch (error) {
    res.status(400).json(error)
  }
}

module.exports = authCheck