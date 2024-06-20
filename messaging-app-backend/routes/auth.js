var express = require("express");
var router = express.Router();

const {
  signupUser,
  loginUser,
  logoutUser,
} = require("../controllers/authControllers");

router.post("/login", loginUser);
router.post("/signup", signupUser);
// router.get("/logout", logoutUser);
// router.get("/reauth", checkAuthentication);

module.exports = router;
