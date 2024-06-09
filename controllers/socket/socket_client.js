const { io } = require("socket.io-client");

const socket = io("http://localhost:8000");

socket.on("connect", () => {
  console.log("local client connected to local socket server");
});

socket.on("disconnect", () => {
  console.log("local client disconnected from local socket server");
});

socket.on("data", (data) => {
  console.log(data);
});

socket.on("error", (error) => {
  console.log(error);
});

module.exports = socket;
