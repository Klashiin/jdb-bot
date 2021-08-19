const mongoose = require("mongoose");
const profileSchema = new mongoose.Schema({
  userID: {type: String, require: true, unique: true},
  serverID: {type: String, require: true},
  pontos: {type: Number, default: 1000},
  lastDaily: {type: Number, default: 0},
  dailyStreak: {type: Number, default: 1},
});

const model = mongoose.model("ProfileModels", profileSchema);

module.exports = model;
