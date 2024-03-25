const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const conversationSchema = new Schema({
  friendList: {
    type: String,
  },
});
module.exports = mongoose.model("Conversation", conversationSchema);
