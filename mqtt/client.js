const mqtt = require("mqtt");
const client = mqtt.connect("mqtt://localhost:2000");

client.on("connect", () => {
  console.log("connected to local broker");
  client.subscribe("device/status", { qos: 1 });
});

client.on("message", (topic, message) => {
  console.log(message.toString());
  console.log(topic);
});

client.on("error", (error) => {
  console.log("failed to connect to local broker");
});

module.exports = client;
