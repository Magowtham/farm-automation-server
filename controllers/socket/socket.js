const EventEmitter = require("events");
const NodeModel = require("../../models/node_model");
const UserModel = require("../../models/user_model");
const NotificationModel = require("../../models/notification_model");
const emailSender = require("../../utils/send_email");

const mqtt_client = require("../../mqtt/client");

const CustomEventEmitter = new EventEmitter();

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

CustomEventEmitter.on("send_notification", async (data) => {
  try {
    const io = require("../../app");
    const parsedData = JSON.parse(data);
    const userId = parsedData.user_id;

    if (userId) {
      const now = new Date();
      const formattedDate = `${
        months[now.getMonth()]
      } ${now.getDate()}, ${now.getFullYear()}`;

      let hours = now.getHours();
      let minutes = now.getMinutes();

      const amOrPm = hours >= 12 ? "pm" : "am";

      hours = hours % 12;
      hours = hours ? hours : 12;

      minutes = minutes < 10 ? "0" + minutes : minutes;

      const formattedTime = `${hours}:${minutes} ${amOrPm}`;

      const users = await UserModel.find({}, { fullName: 1 });

      let fullName = "";

      users.forEach((user) => {
        if (user._id.toString() === userId) {
          fullName = user.fullName;
        }
      });

      users.forEach(async (user) => {
        const id = user._id.toString();
        if (id !== userId) {
          await NotificationModel({
            userId: id,
            userFullName: fullName,
            nodeName: parsedData.node_name,
            state: parsedData.state,
            date: formattedDate,
            time: formattedTime,
          }).save();
        }
      });

      io.emit("notification");
    }
  } catch (error) {
    console.log(error);
  }
});

const handleConnect = () => {
  console.log("connected to socket");
};

const handleDisconnect = () => {
  console.log("disconnected from socket");
};

const handleDripMotor = (data) => {
  try {
    mqtt_client.publish("anmaya_iot1.0", JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
};

const handleFogMotor = (data) => {
  try {
    mqtt_client.publish("anmaya_iot1.0", JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
};

const handleCoolerPadMotor = (data) => {
  try {
    mqtt_client.publish("anmaya_iot1.0", JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
};

const handleValve = (data) => {
  try {
    mqtt_client.publish("anmaya_iot1.0", JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
};

const handleNodeAcknowledgement = async (data, socket) => {
  console.log("***");
  console.log(data);
  try {
    const { nodeName, state } = JSON.parse(data);
    await NodeModel.updateOne({ name: nodeName }, { $set: { state: state } });
    //CustomEventEmitter.emit("send_notification", data);
    socket.broadcast.emit("adminpanel-acknowledgement", {
      nodeName: nodeName,
      state: state,
    });
  } catch (error) {
    console.log(error);
  }
};

const handleNodeMannualControl = async (data, socket) => {
  try {
    const { nodeName, nodeState } = JSON.parse(data);
    await NodeModel.updateOne(
      { name: nodeName },
      { $set: { state: nodeState } }
    );
    socket.broadcast.emit("node-mannual-control", {
      nodeName: nodeName,
      nodeState: nodeState,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  handleConnect,
  handleDisconnect,
  handleDripMotor,
  handleFogMotor,
  handleCoolerPadMotor,
  handleValve,
  handleNodeAcknowledgement,
  handleNodeMannualControl,
};
