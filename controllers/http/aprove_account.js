const path = require("path");
const UserModel = require("../../models/user_model");
const socket_client = require("../socket/socket_client");
const aproveAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findById(id);
    if (!user) {
      res.status(400).send("user not exists");
      return;
    }
    await UserModel.findByIdAndUpdate(id, { $set: { accountAproved: true } });

    socket_client.emit("account-aproved", { userId: id });
    res.sendFile(
      path.join(__dirname, "..", "..", "views", "user_account_aprove.html")
    );
  } catch (error) {
    res.status(500).send("internal server error");
  }
};

module.exports = aproveAccount;
