const DeviceModel = require("../../models/device_model");
const checkDeviceStatus = async (req, res) => {
  try {
    const { device_id } = req.params;
    const device = await DeviceModel.findById(device_id, { device_status: 1 });

    if (device.device_status) {
      res.status(200).json({ message: "unit is online" });
    } else {
      res.status(400).json({ message: "unit is offline" });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = checkDeviceStatus;
