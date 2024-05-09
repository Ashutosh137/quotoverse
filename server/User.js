const mongoose = require("mongoose");

const userschema = new mongoose.Schema({
  email: String,
  password: String,
  createdAt: { type: Date, default: Date.now },
});

const User = new mongoose.model("User", userschema);
module.exports = User;
