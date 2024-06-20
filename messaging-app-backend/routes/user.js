var express = require("express");
var router = express.Router();

const requireAuth = require("../middleware/authMiddleware");
const {
  getConversations,
  getUsers,
  updatePassword,
} = require("../controllers/userControllers");

router.get("/conversations", requireAuth, getConversations);
router.patch("/password", requireAuth, updatePassword);

module.exports = router;
