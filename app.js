const http = require("http");
const express = require("express");
const cors = require("cors");
const connectToDb = require("./db/db_connect");
const { socketHandler } = require("./routes/socket");

require("dotenv").config();
const app = express();

const HOST = "0.0.0.0";
const PORT = process.env.PORT;

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

//socket server instance
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
    //setting the socket handler
    io.on("connection", socketHandler);
    //settig the api endpoint and handler
    app.use("/api", require("./routes/http"));
    //starting the mqtt broker (which handles the hardware unit)
    require("./mqtt/broker");
  } catch (error) {
    console.log("Database connection failed");
  }
})();

//starting the http server
server.listen(PORT, HOST, () => {
  console.log(`server is running on port: ${PORT}`);
});
