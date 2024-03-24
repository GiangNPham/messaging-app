const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const conversationSchema = new Schema({
  friendList: {
    type: [mongoose.Types.ObjectId],
  },
});
module.exports = mongoose.model("Message", conversationSchema);
