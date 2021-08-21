const mongoose = require("mongoose");
const bichoSchema = new mongoose.Schema({
  nome: {type: String, require: true, unique: true},
  image: {type: String, require: true},
  emoji: {type: String, require: true},
  totalWins: {type: Number, default: 0},
});

const model = mongoose.model("BichoModels", bichoSchema);

module.exports = model;