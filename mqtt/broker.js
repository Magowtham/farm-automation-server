const aedes = require("aedes")();
const server = require("net").createServer(aedes.handle);
const dotEnv = require("dotenv");
const socket = require("../controllers/socket/socket_client");
const DeviceModel = require("../models/device_model");
const dataLogger = require("./logger");

dotEnv.config();

const MQTT_BROKER_PORT = process.env.MQTT_BROKER_PORT;

aedes.on("client", (client) => {
  console.log(`${client.id} connected to MQTT`);
});

aedes.on("clientDisconnect", async (client) => {
  try {
    console.log(`${client.id} disconnected from the MQTT server`);
    await DeviceModel.updateOne(
      { device_id: client.id },
      { $set: { device_status: false } }
    );
  } catch (error) {
    console.log(error);
  }
});

aedes.on("subscribe", async ([client]) => {
  console.log("client subscribe to MQTT");
  try {
    await DeviceModel.updateOne(
      { device_id: client.topic },
      { $set: { device_status: true } }
    );
  } catch (error) {
    console.log(error);
  }
});

aedes.on("publish", async (packete, client) => {
  if (packete.topic === "iot_control_ack") {
    socket.emit("iot-control-ack", packete.payload.toString());
  }
  if (packete.topic === "relays_state") {
    socket.emit("relays_state", packete.payload.toString());
  }
});

server.listen(MQTT_BROKER_PORT, () => {
  console.log(`MQTT broker listening on: ${MQTT_BROKER_PORT}`);
});
