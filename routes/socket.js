const controller = require("../controllers/socket/socket");

const socketHandler = (socket) => {
  controller.handleConnect();
  socket.on("disconnect", (data) => controller.handleDisconnect(data, socket));
  socket.on("iot-control", (data) => controller.handleIotControl(data, socket));
  socket.on("iot-control-ack", (data) =>
    controller.handleIotControlAck(data, socket)
  );
  socket.on("relays_state", (data) =>
    controller.handleRelaysState(data, socket)
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
