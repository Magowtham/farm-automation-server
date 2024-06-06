const controller = require("../controllers/socket/socket");

const socketHandler = (socket) => {
  controller.handleConnect();

  socket.on("disconnect", controller.handleDisconnect);
  socket.on("drip-motor", controller.handleDripMotor);
  socket.on("fog-motor", controller.handleFogMotor);
  socket.on("cooler-motor", controller.handleCoolerPadMotor);
  socket.on("valve", controller.handleValve);
  socket.on("node-iot-control-ack", (data) =>
    controller.handleNodeAcknowledgement(data, socket)
  );
  socket.on("node-mannual-control", (data) =>
    controller.handleNodeMannualControl(data, socket)
  );
};

module.exports = { socketHandler };
