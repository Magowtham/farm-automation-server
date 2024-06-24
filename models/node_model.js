const mongoose = require("mongoose");

const NodeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  relay_id: { type: Number, required: true, unique: true },
  device_id: { type: String, required: true },
  node_pin: { type: String, required: true },
  node_manual_control_pin: { type: String, required: true },
  power_consumption: { type: String, required: false, default: "0" },
  usage_time: { type: String, required: false, default: "0" },
  event: { type: String, required: true },
  state: { type: Boolean, required: false, default: false },
});

module.exports = mongoose.model("nodes", NodeSchema);
