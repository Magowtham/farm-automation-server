const mqtt = require("mqtt");
const client = mqtt.connect("mqtt://localhost:2000");

client.on("connect", () => {
  console.log("connected to local broker");
  client.subscribe("local_client");
});

module.exports = client;
