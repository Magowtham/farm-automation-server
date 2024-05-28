const FarmModel = require("../../models/farm_model");
const DeviceModel = require("../../models/device_model");

const createDevice = async (req, res) => {
  try {
    const { farmId, name } = req.body;
    const farm = await FarmModel.findById(farmId);
    if (!farm) {
      res.status(404).json({ message: "farm not found" });
      return;
    }

    const devices = await DeviceModel.find({
      farm_id: farmId,
      device_name: name,
    });

    if (devices.length) {
      res.status(400).json({ message: "device already exists" });
      return;
    }
    await FarmModel.updateOne(
      { farm_name: farm.farm_name },
      { $set: { farm_device_count: farm.farm_device_count + 1 } }
    );
    await DeviceModel({ device_name: name, farm_id: farmId }).save();
    res.status(201).json({ message: "device added successfully" });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

module.exports = createDevice;
