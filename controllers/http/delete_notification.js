const NotificationModel = require("../../models/notification_model");
const deleteNotification = async (req, res) => {
  try {
    const { notification_id } = req.params;
    await NotificationModel.findByIdAndDelete(notification_id);
    res.status(200).json({ message: "notification deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
};

module.exports = deleteNotification;
