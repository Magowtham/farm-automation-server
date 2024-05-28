const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  userFullName: { type: String, required: true },
  nodeName: { type: String, required: true },
  state: { type: Boolean, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
});

module.exports = mongoose.model("notifications", NotificationSchema);
