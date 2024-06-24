const DeviceModel = require("../../models/device_model");
const NodeModel = require("../../models/node_model");
const mongoose = require("mongoose");
const createNode = async (req, res) => {
  try {
    const { deviceId, name, nodePin, nodeManualControlPin } = req.body;

    const device = await DeviceModel.findById(deviceId);
    if (!device) {
      res.status(404).json({ message: "device not found" });
      return;
    }
    const createdNodes = await NodeModel.find(
      { device_id: deviceId, name: name },
      { name: 1 }
    );
    if (createdNodes.length) {
      res.status(400).json({ message: "node already exists" });
      return;
    }
    const { available_node_pins, available_node_manual_control_pins } =
      await DeviceModel.findById(deviceId, {
        available_node_pins: 1,
        available_node_manual_control_pins: 1,
      });
    const nodePinIndex = available_node_pins.indexOf(nodePin);
    const nodeManualControlPinIndex =
      available_node_manual_control_pins.indexOf(nodeManualControlPin);

    if (nodePinIndex == -1) {
      res.status(404).json({ message: "Node pin is not available" });
      return;
    }

    if (nodeManualControlPinIndex == -1) {
      res.status(404).json({ message: "Node manual control is not available" });
      return;
    }

    const event = `${deviceId}-${name.replace(/\s+/g, "").toLowerCase()}`;

    const docCount = await NodeModel.countDocuments();

    const newNode = new NodeModel({
      name: name,
      relay_id: docCount + 1,
      device_id: deviceId,
      node_pin: nodePin,
      node_manual_control_pin: nodeManualControlPin,
      event: event,
    });

    await newNode.save();

    await DeviceModel.findByIdAndUpdate(deviceId, {
      $push: {
        connected_nodes: {
          id: newNode.id,
          name: name,
          node_pin: nodePin,
          node_manual_control_pin: nodeManualControlPin,
          event: event,
        },
      },
    });

    const deviceObjectId = new mongoose.Types.ObjectId(deviceId);
    available_node_pins.splice(nodePinIndex, 1);
    available_node_manual_control_pins.splice(nodeManualControlPinIndex, 1);

    await DeviceModel.updateOne(
      { _id: deviceObjectId },
      {
        $set: {
          available_node_pins: available_node_pins,
          available_node_manual_control_pins:
            available_node_manual_control_pins,
        },
      }
    );

    res.status(201).json({ message: "device added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
};

module.exports = createNode;
