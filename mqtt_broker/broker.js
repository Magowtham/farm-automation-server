const aedes = require("aedes")();
const server = require("net").createServer(aedes.handle);
const dotEnv = require("dotenv");

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
  if (packete.topic === "broker") {
    const {
      handleNodeAcknowledgement,
    } = require("../controllers/socket/socket");
    const data = packete.payload.toString();
    handleNodeAcknowledgement(data);
  }
});

const mqttPublisher = (data) => {
  aedes.publish({
    topic: "device1",
    payload: JSON.stringify({
      userId: data.userId,
      nodeName: data.nodeName,
      state: data.state,
    }),
  });
};

server.listen(MQTT_BROKER_PORT, () => {
  console.log(`MQTT broker listening on: ${MQTT_BROKER_PORT}`);
});

module.exports = { mqttPublisher };
