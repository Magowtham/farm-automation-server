const DeviceModel = require("../../models/device_model");
const getDeviceData = async (req, res) => {
  try {
    const { deviceId } = req.query;
    const { connected_nodes } = await DeviceModel.findById(deviceId, {
      connected_nodes: 1,
    });
    res.status(200).json({ connected_nodes });
  } catch (error) {
    res.status(404).json({ message: "device not found" });
  }
};

module.exports = getDeviceData;
