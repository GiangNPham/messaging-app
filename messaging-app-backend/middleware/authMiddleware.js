const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");

const requireAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1] || null;
  if (!token) return res.status(401).json({ err: "Unauthorized" });

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
