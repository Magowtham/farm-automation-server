const DeviceModel = require("../../models/device_model");
const NodeModel = require("../../models/node_model");
const emailSender = require("../../utils/send_email");
const mqtt_client = require("../../mqtt/client");

const client_topic = "unit1";

const handleConnect = () => {
  console.log("connected to socket");
};

const handleDisconnect = () => {
  console.log("disconnected from socket");
};

const handleDripMotor = async (data, socket) => {
  try {
    const result = await DeviceModel.findById(data.deviceId, {
      device_status: 1,
    });
    if (result.device_status) {
      mqtt_client.publish(client_topic, JSON.stringify(data));
    } else {
      socket.emit("unit-disconnected");
    }
  } catch (error) {
    console.log(error);
  }
};

const handleFogMotor = async (data, socket) => {
  try {
    const result = await DeviceModel.findById(data.deviceId, {
      device_status: 1,
    });
    if (result.device_status) {
      mqtt_client.publish(client_topic, JSON.stringify(data));
    } else {
      socket.emit("unit-disconnected");
    }
  } catch (error) {
    console.log(error);
  }
};

const handleCoolerPadMotor = async (data, socket) => {
  try {
    const result = await DeviceModel.findById(data.deviceId, {
      device_status: 1,
    });
    if (result.device_status) {
      mqtt_client.publish(client_topic, JSON.stringify(data));
    } else {
      socket.emit("unit-disconnected");
    }
  } catch (error) {
    console.log(error);
  }
};

const handleValve = async (data, socket) => {
  try {
    const result = await DeviceModel.findById(data.deviceId, {
      device_status: 1,
    });
    if (result.device_status) {
      mqtt_client.publish(client_topic, JSON.stringify(data));
    } else {
      socket.emit("unit-disconnected");
    }
  } catch (error) {
    console.log(error);
  }
};

const handleNodeAcknowledgement = async (data, socket) => {
  try {
    const { nodeName, state } = JSON.parse(data);
    await NodeModel.updateOne({ name: nodeName }, { $set: { state: state } });
    //socket_client.emit("notification", data);
    socket.broadcast.emit("adminpanel-acknowledgement", {
      nodeName: nodeName,
      state: state,
    });
  } catch (error) {
    console.log(error);
  }
};

const handleNodeMannualControl = async (data, socket) => {
  try {
    const { nodeName, nodeState } = JSON.parse(data);
    await NodeModel.updateOne(
      { name: nodeName },
      { $set: { state: nodeState } }
    );
    socket.broadcast.emit("node-mannual-control", {
      nodeName: nodeName,
      nodeState: nodeState,
    });
  } catch (error) {
    console.log(error);
  }
};

const handleAccountApproved = (data, socket) => {
  try {
    socket.broadcast.emit("account-aproved", data);
  } catch (error) {
    console.log(error);
  }
};

const handleAccountRejected = (data, socket) => {
  try {
    socket.broadcast.emit("account-rejected", data);
  } catch (error) {
    console.log(error);
  }
};

const handleEmailVerified = (data, socket) => {
  try {
    socket.broadcast.emit("email-verified", data);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  handleConnect,
  handleDisconnect,
  handleDripMotor,
  handleFogMotor,
  handleCoolerPadMotor,
  handleValve,
  handleNodeAcknowledgement,
  handleNodeMannualControl,
  handleAccountApproved,
  handleAccountRejected,
  handleEmailVerified,
};
