var express = require("express");
var router = express.Router();

const Message = require("../models/messageSchema");
const Conversation = require("../models/conversationSchema");
const User = require("../models/userSchema");

const requireAuth = require("../middleware/authMiddleware");

const {
  searchUser,
  checkUser,
  getMessage,
  createDirect,
  createGroup,
} = require("../controllers/chatControllers");

//

// get messages for a conversation
router.get("/conversation/:id", requireAuth, getMessage);

// check if user exists
router.get("/checkuser/:id", requireAuth, checkUser);

// create direct chat
router.post("/createDirect", requireAuth, createDirect);

// create group chat
router.post("/createGroup", requireAuth, createGroup);

// ***** write controller for
// 1. creating conversation (with group name) (convert the username to user id in db)
// 2. creating message in a conversation

// router.get("/", async (req, res) => {
//   try {
//     const curUserID = req.session.userID;

//     // find all conversations that the user is involved

//     const allConversations = await Conversation.find({
//       friendList: { $elemMatch: { $eq: curUserID } },
//     });

//     // find every exsiting user and not query their passwords

//     // const allUsers = await User.find({
//     //   _id: { $ne: curUserID },
//     // }).select("-password");

//     res.status(200).json({ curUserID });
//   } catch (err) {
//     res.status(400).json({ err });
//   }
// });

// get a conversation's messages

// router.get("/:id", async (req, res) => {
//   if (!req.session.isAuth) return res.redirect("/login");

//   try {
//     const conversationID = req.params.id;
//     const allMessages = await Message.find({
//       destination: { $eq: conversationID },
//     });

//     res.json({ allMessages });
//   } catch (err) {
//     res.json({ err });
//   }
// });

// create a conversation
// router.post("/create", async (req, res) => {
//   // in frontend, create a form to select which users to add into a group (even if it is 1-1)

//   try {
//     const { newFriendList } = req.body;

//     async function getFriendID(friend) {
//       const tempUser = await User.findOne({ username: friend });
//       return tempUser._id.toString();
//     }

//     const newFriendListID = await Promise.all(newFriendList.map(getFriendID));

//     newFriendListID.push(req.session.userID);

//     const newConversation = new Conversation({ friendList: newFriendListID });

//     await newConversation.save();
//     res.json(newConversation);
//   } catch (err) {
//     res.json({ err });
//   }
// });

// post a message into a conversation
// router.post("/:id", async (req, res) => {
//   try {
//     const conversationID = req.params.id;
//     const newMessage = new Message({
//       sender: req.session.userID,
//       destination: conversationID,
//       content: req.body.content,
//     });
//     await newMessage.save();
//     res.json({ newMessage });
//   } catch (err) {
//     res.json({ err });
//   }
// });

module.exports = router;
