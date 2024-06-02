const http = require("http");
const express = require("express");
const cors = require("cors");
const dotEnv = require("dotenv");
const connectToDb = require("./db/db_connect");
require("./tcp/tcp_server");
const { socketHandler } = require("./routes/socket");

dotEnv.config();

const app = express();

const HOST = "0.0.0.0";
const PORT = process.env.PORT || 9000;

//middlewares
app.use(express.static(__dirname + "/views"));
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://growsync-422206.el.r.appspot.com",
    ],
    credentials: true,
  })
);
app.use(express.json());

const server = http.createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

// connecting to database
(async () => {
  try {
    await connectToDb();
    console.log("connected to database");
    const tcpClient = require("./tcp/tcp_client");
    io.on("connection", (socket) => socketHandler(socket, tcpClient));

    app.use("/api", require("./routes/http"));
  } catch (error) {
    console.log("Database connection failed");
  }
})();

app.get("/test", (req, res) => {
  res.send("hello world to all");
});

server.listen(PORT, HOST, () => {
  console.log(`server is running on port: ${PORT}`);
});

module.exports = io;
