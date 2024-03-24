const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  sender: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  destination: {
    type: mongoose.Types.ObjectId,
    ref: "Conversation",
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});
module.exports = mongoose.model("Message", messageSchema);
