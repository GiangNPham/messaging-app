require("dotenv").config();

const Message = require("../models/messageSchema");
const Conversation = require("../models/conversationSchema");
const User = require("../models/userSchema");

const checkUser = async (req, res) => {
  try {
    const checkUsername = req.params.id;

    const foundUser = await User.find({ username: checkUsername });
    if (foundUser.length === 1) res.status(200).json({ foundUser });
    else res.status(400).json({ err: "User does not exist" });
  } catch (err) {
    res.status(400).json({ err: "User does not exist" });
  }
};

const createDirect = async (req, res) => {
  try {
    // get the ID and username of the current user
    const curUserID = res.userID;
    const curUser = await User.findOne({ _id: curUserID });
    const curUsername = curUser.username;

    // get the ID and username of the receiver
    const { groupMem } = req.body;
    const directUsername = groupMem[0];
    const directUser = await User.findOne({ username: directUsername });
    const directUserID = directUser._id;

    const existingChat = await Conversation.find({
      $or: [
        {
          friendList: { $eq: [curUserID, directUserID] },
        },
        { friendList: { $eq: [directUserID, curUserID] } },
      ],
    });

    if (existingChat.length === 0) {
      // stop here*****
      const newDirect = new Conversation({
        friendList: [curUserID, directUserID],
        friendListName: [curUsername, directUsername],
      });
      await newDirect.save();
      res.status(200).json({ chatID: newDirect._id });
    } else {
      res.status(200).json({ chatID: existingChat[0]._id });
    }
  } catch (err) {
    res.status(400).json({ err: err });
  }
};

const createGroup = async (req, res) => {
  try {
    // get current user's username and ID
    const { groupMem, groupName } = req.body;
    const curUserID = res.userID;
    const curUser = await User.findOne({ _id: curUserID });
    const curUsername = curUser.username;

    let friendList = [curUserID];
    for (const mem of groupMem) {
      const directUser = await User.findOne({ username: mem });
      const directUserID = directUser._id;
      friendList.push(directUserID);
    }
    groupMem.push(curUsername);

    const newDirect = new Conversation({
      friendList: friendList,
      friendListName: groupMem,
      groupName: groupName,
    });
    await newDirect.save();
    res.status(200).json({ chatID: newDirect._id });
  } catch (err) {
    res.status(400).json({ err: err });
  }
};

const searchUser = async (req, res) => {
  try {
    const curUserID = res.userID;

    const keyword = req.query.search
      ? {
          username: { $regex: req.query.search, $options: "i" },
        }
      : {};

    const users = await User.find(keyword).find({ _id: { $ne: curUserID } });
    res.status(200).json({ users });
  } catch (err) {
    res.status(400).json({ err });
  }
};

// const getConversations = async (req, res) => {
//   try {
//     const curUserID = res.userID;

//     const allConversations = await Conversation.find({
//       friendList: { $elemMatch: { $eq: curUserID } },
//     });

//     res.status(200).json({ allChats: allConversations });
//   } catch (err) {
//     res.status(400).json({ err });
//   }
// };

const getMessage = async (req, res) => {
  try {
    const conversationID = req.params.id;
    const curUserID = res.userID;

    // check if the current user has authorization to see this conversation

    const chosenConversation = await Conversation.findOne({
      _id: { $eq: conversationID },
      friendList: { $elemMatch: { $eq: curUserID } },
    });

    if (Object.keys(chosenConversation) === 0)
      return res.status(400).json({ err: "No permission" });

    const allMessages = await Message.find({
      destination: { $eq: conversationID },
    });

    res.status(200).json({ allMessages });
  } catch (err) {
    res.status(400).json({ err });
  }
};

module.exports = {
  searchUser,
  checkUser,
  getMessage,
  createDirect,
  createGroup,
};
