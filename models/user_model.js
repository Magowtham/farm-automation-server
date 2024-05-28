const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  emailVerified: { type: Boolean, required: false, default: false },
  accountAproved: { type: Boolean, required: false, default: false },
  password: { type: String, required: true },
  accessible_farm_id: { type: String, required: true },
});

module.exports = mongoose.model("users", UserSchema);
