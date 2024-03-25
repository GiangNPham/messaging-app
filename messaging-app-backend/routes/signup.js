var express = require("express");
var router = express.Router();
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");

const User = require("../models/userSchema");

router.get("/", function (req, res, next) {});

router.post(
  "/",
  //  **** write a custom to check unique email
  check("username").notEmpty().withMessage("Not a valid username"),
  check("password", "Not long enough, min 8 characters").isLength({ min: 8 }),
  check("passwordConfirmation", "Two passwords are not the same").custom(
    (value, { req }) => {
      return value === req.body.password;
    }
  ),
  async (req, res, next) => {
    // handle data error here
    const result = validationResult(req);
    if (result.isEmpty()) {
      try {
        const hashedPs = await bcrypt.hash(req.body.password, 12);
        const newUser = new User({
          username: req.body.username,
          password: hashedPs,
        });
        await newUser.save();
        res.json(newUser);
        //   res.redirect("/login");
      } catch (err) {
        res.status(400).json({ err });
      }
    } else res.send({ err: result.array() });
  }
);

module.exports = router;
