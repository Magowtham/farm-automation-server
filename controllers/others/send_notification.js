const UserModel = require("../../models/user_model");
const NotificationModel = require("../../models/notification_model");

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

const handleNotification = async (data, socket) => {
  try {
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

      socket.broadcast.emit("notification");
    }
  } catch (error) {
    console.log(error);
  }
};
