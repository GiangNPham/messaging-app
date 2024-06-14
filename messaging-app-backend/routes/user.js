var express = require("express");
var router = express.Router();
const bcrypt = require("bcryptjs");

const User = require("../models/userSchema");
const { check, validationResult } = require("express-validator");

const requireAuth = require("../middleware/authMiddleware");
const {
  getConversations,
  getUsers,
  updatePassword,
  updateUsername,
} = require("../controllers/userControllers");

router.get("/conversations", requireAuth, getConversations);
router.get("/users", requireAuth, getUsers);
router.patch("/password", requireAuth, updatePassword);
router.patch("/username", requireAuth, updateUsername);

module.exports = router;
