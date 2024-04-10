require("dotenv").config();

const Message = require("../models/messageSchema");
const Conversation = require("../models/conversationSchema");
const User = require("../models/userSchema");

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

const getConversations = async (req, res) => {
  try {
    const curUserID = res.userID;

    const allConversations = await Conversation.find({
      friendList: { $elemMatch: { $eq: curUserID } },
    });

    res.status(200).json({ allChats: allConversations });
  } catch (err) {
    res.status(400).json({ err });
  }
};

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

module.exports = { searchUser, getConversations, getMessage };
