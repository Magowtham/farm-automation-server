const aedes = require("aedes")();
const server = require("net").createServer(aedes.handle);
const dotEnv = require("dotenv");
const socket = require("../controllers/socket/socket_client");

dotEnv.config();

const MQTT_BROKER_PORT = process.env.MQTT_BROKER_PORT;

aedes.on("client", (client) => {
  console.log(`${client.id} connected to MQTT`);
});

aedes.on("clientDisconnect", (client) => {
  console.log(`${client.id} disconnected from MQTT`);
});

aedes.on("subscribe", (client) => {
  console.log("client subscribe to MQTT");
});

aedes.on("publish", (packete, client) => {
  if (packete.topic === "iot_control_ack") {
    socket.emit("node-iot-control-ack", packete.payload.toString());
  }
  if (packete.topic === "mannual_control") {
    socket.emit("node-mannual-control", packete.payload.toString());
  }
});

server.listen(MQTT_BROKER_PORT, () => {
  console.log(`MQTT broker listening on: ${MQTT_BROKER_PORT}`);
});

module.exports = { mqttPublisher };
