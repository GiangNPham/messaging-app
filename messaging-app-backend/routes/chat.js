var express = require("express");
var router = express.Router();

const Message = require("../models/messageSchema");
const Conversation = require("../models/conversationSchema");
const User = require("../models/userSchema");

// get all the conversations
router.get("/", async (req, res) => {
  if (!req.session.isAuth) return res.redirect("/login");

  try {
    const userID = req.session.userID;
    // find all conversations that the user is involved
    const allConversations = await Conversation.find({
      friendList: { $elemMatch: { $eq: userID } },
    });

    // find every exsiting user and not query their passwords
    const allUsers = await User.find({
      username: { $ne: userID },
    }).select("-password");

    res.json({ allConversations, allUsers });
  } catch (err) {
    res.json(err);
  }
});

// get a conversation's messages
router.get("/:id", (req, res) => {});

// post a message into a conversation
router.post("/:id", (req, res) => {});

// create a conversation
router.post("/create", (req, res) => {
  // in frontend, create a form to select which users to add into a group (even if it is 1-1)
});

module.exports = router;
