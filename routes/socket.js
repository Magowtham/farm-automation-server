const controller = require("../controllers/socket/socket");

const socketHandler = (socket) => {
  controller.handleConnect();
  socket.on("disconnect", (data, socket) =>
    controller.handleDisconnect(data, socket)
  );
  socket.on("drip-motor", (data) => {
    socket.broadcast.emit("data", "hello");
    controller.handleDripMotor(data, socket);
  });
  socket.on("fog-motor", (data) => controller.handleFogMotor(data, socket));
  socket.on("cooler-motor", (data) =>
    controller.handleCoolerPadMotor(data, socket)
  );
  socket.on("valve", (data) => controller.handleValve(data, socket));
  socket.on("node-iot-control-ack", (data) =>
    controller.handleNodeAcknowledgement(data, socket)
  );
  socket.on("node-mannual-control", (data) =>
    controller.handleNodeMannualControl(data, socket)
  );
  socket.on("account-aproved", (data) =>
    controller.handleAccountApproved(data, socket)
  );
  socket.on("account-rejected", (data) =>
    controller.handleAccountRejected(data, socket)
  );
  socket.on("email-verified", (data) =>
    controller.handleEmailVerified(data, socket)
  );
};

module.exports = { socketHandler };
