const NotificationModel = require("../../models/notification_model");
const getNotifications = async (req, res) => {
  try {
    const { user_id } = req.params;
    const notifications = [];
    const result = await NotificationModel.find({ userId: user_id });
    result.forEach((notification) => {
      notifications.unshift({
        id: notification._id.toString(),
        userFullName: notification.userFullName,
        nodeName: notification.nodeName,
        state: notification.state,
        date: notification.date,
        time: notification.time,
      });
    });
    res.status(200).json({ notifications });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

module.exports = getNotifications;
