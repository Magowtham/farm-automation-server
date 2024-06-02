const net = require("net");

const PORT = 5000;

const server = net.createServer((socket) => {
  console.log("Client connected");

  socket.on("data", (data) => {
    console.log("Received data:", data.toString());
  });

  socket.on("end", () => {
    console.log("Client disconnected");
  });

  socket.on("error", (err) => {
    console.error("Socket error:", err);
  });

  setInterval(() => {
    socket.write("Welcome to the server!\r\n");
  }, 1000);
});

server.on("error", (err) => {
  console.error("Server error:", err);
});

server.listen(PORT, () => {
  console.log(`Server running at :${PORT}`);
});
