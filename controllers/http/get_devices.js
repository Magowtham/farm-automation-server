const DeviceModel = require("../../models/device_model");
const getDevices = async (req, res) => {
  try {
    const { farm_id } = req.query;
    let devices = await DeviceModel.find({ farm_id: farm_id });
    if (!devices) {
      res.status(404).json({ message: "farm not found" });
      return;
    }
    devices = devices.map((device) => ({
      device_id: device._id.toString(),
      device_name: device.device_name,
      device_status: device.device_status,
      farm_id: device.farm_id,
      connected_nodes_length: device.connected_nodes.length,
      power_consumption: device.power_consumption,
    }));
    res.status(200).json({ devices });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

module.exports = getDevices;
