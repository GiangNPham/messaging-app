const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");

const requireAuth = (req, res, next) => {
  if (req.cookies.jwt === null)
    return res.status(401).json({ err: "Unauthorized" });
  const token = req.cookies.jwt;

  // check if jwt exits
  if (token) {
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, decodedToken) => {
      if (err) return res.status(401).json({ err: "Unauthorized" });
      else {
        res.userID = decodedToken.id;
        next();
      }
    });
  } else {
    return res.status(401).json({ err: token });
  }
};

module.exports = requireAuth;
