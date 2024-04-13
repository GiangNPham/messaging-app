const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("../models/userSchema");

const maxAge = 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.ACCESS_TOKEN, {
    expiresIn: maxAge,
  });
};

const signupUser = async (req, res) => {
  const { username, password, passwordConfirmation } = req.body;

  //   check if all the fields are filled
  if (!username || !password || !passwordConfirmation) {
    return res.status(400).json({ err: "Please enter all the fields" });
  }

  //   check if username exists in the database
  const checkUsername = await User.find({
    username: username,
  }).countDocuments();
  if (checkUsername !== 0) {
    return res.status(400).json({ err: "Username already exists" });
  }

  // check password length
  if (password.length < 8) {
    return res.status(400).json({ err: "Not long enough, min 8 characters" });
  }

  // check password confirmation
  if (password !== passwordConfirmation) {
    return res.status(400).json({ err: "Two passwords are not the same" });
  }

  try {
    const hashedPs = await bcrypt.hash(req.body.password, 12);
    const newUser = new User({
      username: req.body.username,
      password: hashedPs,
    });
    await newUser.save();
    res.status(200).json("Sign up successfully");
  } catch (err) {
    res.status(400).json({ err });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user) {
    return res.status(400).json({ err: "No account found" });
  }

  const pwMatch = await bcrypt.compare(password, user.password);
  if (!pwMatch) {
    return res.status(400).json({ err: "Wrong password" });
  }
  const userID = user._id;
  const token = createToken(userID);
  res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
  res.status(200).json({ userID: user._id });
};

const logoutUser = async (req, res) => {
  try {
    await res.clearCookie("jwt");
    res.status(200).json("Log out successfully");
  } catch (err) {
    res.status(400).json({ err });
  }
};

const checkAuthentication = async (req, res) => {
  try {
    const cki = req.cookies["jwt"];
    if (cki) {
      return res.status(200).json({ msg: "Authenticated" });
    } else {
      return res.status(401).json({ err: "Unauthenticated" });
    }
  } catch (err) {
    res.status(400).json({ err });
  }
};

module.exports = { signupUser, loginUser, logoutUser, checkAuthentication };
