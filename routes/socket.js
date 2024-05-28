const controller = require("../controllers/socket/socket");

const socketHandler = (socket) => {
  controller.handleConnect();
  socket.on("disconnect", () => controller.handleDisconnect());
  socket.on("drip-motor", (data) => controller.handleDripMotor(data));
  socket.on("fog-motor", (data) => controller.handleFogMotor(data));
  socket.on("cooler-motor", (data) => controller.handleCoolerPadMotor(data));
  socket.on("valve", (data) => controller.handleValve(data));
};

module.exports = { socketHandler };
