const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.dbURL);
  } catch (err) {
    console.error("database connection error", err);
  }
};

module.exports = connectDB;
