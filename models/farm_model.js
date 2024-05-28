const mongoose = require("mongoose");

const FarmSchema = new mongoose.Schema({
  farm_name: { type: String, required: true, unique: true },
  farm_device_count: { type: Number, required: false, default: 0 },
  farm_power_consumption: { type: String, required: false, default: 0 },
  farm_water_consumption: { type: String, required: false, default: 0 },
});

module.exports = mongoose.model("farms", FarmSchema);
