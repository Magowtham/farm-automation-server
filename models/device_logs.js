const mongoose = require("mongoose");

const DeviceLogsSchema = new mongoose.Schema({
  device_id: { type: String, required: true },
  date_time: { type: Date, default: Date.now },
  relay_id: { type: String, required: true },
  relay_status: { type: Boolean, required: true },
});

module.exports = mongoose.model("device_logs", DeviceLogsSchema);
