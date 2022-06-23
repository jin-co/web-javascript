const jwt = require('jsonwebtoken')

const authCheck = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    req.userData = {
      token: token.email,
      userId: token.userId
    }
    console.log('auth check: ', token)
  } catch (error) {
    res.status(400).json(error)
  }
}

module.exports = authCheck