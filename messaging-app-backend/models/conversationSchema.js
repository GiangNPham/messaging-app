const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const conversationSchema = new Schema({
  friendList: {
    type: [String],
    // list of username
  },
});
module.exports = mongoose.model("Conversation", conversationSchema);
