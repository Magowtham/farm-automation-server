const DeviceModel = require("../../models/device_model");
const NodeModel = require("../../models/node_model");
const DeviceLogsModel = require("../../models/device_logs");
const emailSender = require("../../utils/send_email");
const mqtt_client = require("../../mqtt/client");

const client_topic = "anmaya@2024unit1";

const handleConnect = () => {
  console.log("connected to socket");
};

const handleDisconnect = () => {
  console.log("disconnected from socket");
};

const handleIotControl = async (data, socket) => {
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

const handleIotControlAck = async (data, socket) => {
  try {
    const { deviceId, relayId, state } = JSON.parse(data);
    await NodeModel.updateOne(
      { device_id: deviceId, relay_id: relayId },
      { $set: { state: state } }
    );
    //socket_client.emit("notification", data);
    socket.broadcast.emit("adminpanel-acknowledgement", {
      deviceId: deviceId,
      relayId: relayId,
      state: state,
    });
  } catch (error) {
    console.log(error);
  }
};

const handleRelaysState = async (data, socket) => {
  try {
    const {
      client_id,
      relay1_state,
      relay2_state,
      relay3_state,
      relay4_state,
    } = JSON.parse(data);

    //searching for a unit to get its document id
    const device = await DeviceModel.findOne(
      { device_id: client_id },
      { _id: 1 }
    );

    if (device) {
      const deviceId = device._id.toString();

      //updating the nodes state
      await NodeModel.updateOne(
        {
          device_id: deviceId,
          relay_id: 1,
          state: { $ne: relay1_state },
        },
        { $set: { state: relay1_state } }
      );

      await NodeModel.updateOne(
        {
          device_id: deviceId,
          relay_id: 2,
          state: { $ne: relay2_state },
        },
        { $set: { state: relay2_state } }
      );

      await NodeModel.updateOne(
        {
          device_id: deviceId,
          relay_id: 3,
          state: { $ne: relay3_state },
        },
        { $set: { state: relay3_state } }
      );

      await NodeModel.updateOne(
        {
          device_id: deviceId,
          relay_id: 4,
          state: { $ne: relay4_state },
        },
        { $set: { state: relay4_state } }
      );
    }
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
  handleIotControl,
  handleIotControlAck,
  handleRelaysState,
  handleAccountApproved,
  handleAccountRejected,
  handleEmailVerified,
};
