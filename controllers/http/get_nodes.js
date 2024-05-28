const DeviceModel = require("../../models/device_model");
const NodeModel = require("../../models/node_model");
const getNodes = async (req, res) => {
  try {
    const { device_id } = req.query;
    const device = await DeviceModel.findById(device_id, {
      available_node_pins: 1,
      available_node_manual_control_pins: 1,
    });
    if (!device) {
      res.status(404).json({ message: "device not found" });
      return;
    }

    const nodes = await NodeModel.find({ device_id: device_id });
    res.status(200).json({
      nodes: nodes,
      available_node_pins: device.available_node_pins,
      available_node_manual_control_pins:
        device.available_node_manual_control_pins,
    });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

module.exports = getNodes;
