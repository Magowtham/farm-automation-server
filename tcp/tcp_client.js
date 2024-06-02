const net = require("net");

const client = new net.Socket();

client.connect(5000, "127.0.0.1", () => {
  console.log("Connected to TCP server");
});

client.on("data", (data) => {
  console.log("Received from TCP server:", data.toString());
});

client.on("close", () => {
  console.log("Connection closed");
});

module.exports = client;
