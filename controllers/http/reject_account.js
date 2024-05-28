const path = require("path");
const UserModel = require("../../models/user_model");
const rejectAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findById(id);
    if (!user) {
      res.status(404).send("user not found");
      return;
    }
    if (user.accountAproved) {
      res.sendFile(
        path.join(__dirname, "..", "..", "views", "invalid_link.html")
      );
      return;
    }
    await UserModel.findByIdAndDelete(id);
    const io = require("../../app");
    io.emit("account-rejected", { userId: id });
    res.sendFile(
      path.join(__dirname, "..", "..", "views", "user_account_reject.html")
    );
  } catch (error) {
    res.status(500).send("internal server error");
  }
};

module.exports = rejectAccount;
