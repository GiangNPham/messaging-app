require("dotenv").config();
const bcrypt = require("bcryptjs");

const User = require("../models/userSchema");
const Message = require("../models/messageSchema");
const Conversation = require("../models/conversationSchema");

// Get user's all conversations and all users

const getConversations = async (req, res) => {
  try {
    const curUserID = res.userID;

    const allConversations = await Conversation.find({
      friendList: { $elemMatch: { $eq: curUserID } },
    });

    res.status(200).json({ allConversations });
  } catch (err) {
    res.status(400).json({ err });
  }
};

const getUsers = async (req, res) => {
  try {
    const curUserID = res.userID;
    const allUsers = await User.find({
      _id: { $ne: curUserID },
    }).select("-password");

    const curUser = await User.findOne({
      _id: { $eq: curUserID },
    }).select("-password");
    const curUsername = curUser.username;

    res.status(200).json({ allUsers, curUsername });
  } catch (err) {
    res.status(400).json({ err });
  }
};

// Update password

const updatePassword = async (req, res) => {
  const newPassword = req.body.password;
  if (newPassword.length < 8) {
    return res.status(400).json({ err: "Not long enough, min 8 characters" });
  }
  try {
    const hashedPs = await bcrypt.hash(newPassword, 12);
    const newDoc = await User.findByIdAndUpdate(
      res.userID,
      {
        password: hashedPs,
      },
      { new: true }
    ).select("-password");
    return res.status(200).json({ newDoc });
  } catch (err) {
    return res.status(400).json({ err });
  }
};

// Update username (can update the username because the group's list contains only the ID of the user, not the username)

const updateUsername = async (req, res) => {
  const newUsername = req.body.username;

  const checkUsername = await User.find({
    username: newUsername,
  }).countDocuments();
  if (checkUsername !== 0) {
    return res.status(400).json({ err: "Username already exists" });
  }

  try {
    const newDoc = await User.findByIdAndUpdate(
      res.userID,
      {
        username: newUsername,
      },
      { new: true }
    ).select("-password");

    return res.status(200).json("Update username successfully");
  } catch (err) {
    return res.status(400).json({ err });
  }
};

module.exports = { getConversations, getUsers, updatePassword, updateUsername };
