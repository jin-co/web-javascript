const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    console.log('req.headers')
    console.log(req.headers)
    try{
        const token = req.headers.authorization.split(' ')[1]

        const decoded = jwt.verify(token, "secret")
        console.log(decoded)

        
        next()
    }catch{

    }
}