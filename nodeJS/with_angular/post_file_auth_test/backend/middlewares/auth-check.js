const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, "secret");
    next();
  } catch (err) {
    res.status(400).json(err);
  }
};
