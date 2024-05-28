const mongoose = require("mongoose");

const TokenSchema = mongoose.Schema({
  user_id: { type: String, required: true },
  token: { type: String, required: true },
});

module.exports = mongoose.model("tokens", TokenSchema);
