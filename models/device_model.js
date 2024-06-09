const mongoose = require("mongoose");

const DeviceSchema = new mongoose.Schema({
  device_name: { type: String, required: true, unique: true },
  device_status: { type: Boolean, required: false, default: false },
  farm_id: { type: String, required: true },
  connected_nodes: { type: Array, required: false, default: [] },
  available_node_pins: {
    type: Array,
    required: false,
    default: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  },
  available_node_manual_control_pins: {
    type: Array,
    required: false,
    default: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
  },
  power_consumption: { type: Number, required: false, default: 0 },
});

module.exports = mongoose.model("devices", DeviceSchema);
