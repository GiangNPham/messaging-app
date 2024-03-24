var express = require("express");
var router = express.Router();
const bcrypt = require("bcryptjs");

const User = require("../models/userSchema");

router.get("/", (req, res) => {
  res.json("Log in");
});

router.post("/", async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user) {
    return res.json("No account found");
  }

  const pwMatch = await bcrypt.compare(password, user.password);
  if (!pwMatch) {
    return res.json("Wrong password");
  }
  req.session.regenerate((err) => {
    if (err) next(err);
  });

  req.session.isAuth = true;
  req.session.userID = user._id;
  res.json(req.session);
  //   res.json("Successfully logged in");
  //   res.redirect("/chat")
});

module.exports = router;
