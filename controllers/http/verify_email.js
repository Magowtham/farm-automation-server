const path = require("path");
const TokenModel = require("../../models/token_model");
const UserModel = require("../../models/user_model");
const FarmModel = require("../../models/farm_model");
const accountAproveTemplate = require("../../utils/account_aprove_template");
const sendEmail = require("../../utils/send_email");
const socket_client = require("../socket/socket_client");

const verifyEmail = async (req, res) => {
  try {
    const { id, token } = req.params;
    const [isTokenExists] = await TokenModel.find({
      user_id: id,
      token: token,
    });
    if (!isTokenExists) {
      res.sendFile(
        path.join(
          __dirname,
          "..",
          "..",
          "views",
          "verification_link_expired.html"
        )
      );
      return;
    }
    const result = await UserModel.findByIdAndUpdate(id, {
      $set: { emailVerified: true },
    });

    const farm = await FarmModel.findById(result.accessible_farm_id, {
      farm_name: 1,
    });

    const template = accountAproveTemplate(
      id,
      result.userName,
      result.fullName,
      result.email,
      farm.farm_name
    );

    await sendEmail("magowtham7@gmail.com", "Account Aprove", template);
    socket_client.emit("email-verified", { userId: id });

    res.sendFile(
      path.join(
        __dirname,
        "..",
        "..",
        "views",
        "email_verification_success.html"
      )
    );
  } catch (error) {
    res.status(500).send("internal server error");
  }
};

module.exports = verifyEmail;
