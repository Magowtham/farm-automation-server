const crypto = require("crypto");
const UserModel = require("../../models/user_model");
const TokenModel = require("../../models/token_model");
const emailVerifyTemplate = require("../../utils/email_verify_template");
const sendEmail = require("../../utils/send_email");

const sendEmailVerifyEmail = async (req, res) => {
  try {
    const { user_id } = req.params;
    const user = await UserModel.findById(user_id);
    if (!user) {
      res.status(404).json({ message: "user not found" });
      return;
    }
    const token = crypto.randomBytes(32).toString("hex");
    await TokenModel({ user_id: user_id, token }).save();
    const template = emailVerifyTemplate(user_id, token);
    await sendEmail(user.email, "Verify Your Email", template);
    setTimeout(async () => {
      await TokenModel.deleteOne({ user_id: user_id });
    }, 50 * 1000);
    res.status(200).json({ message: "email sent successfully" });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

module.exports = sendEmailVerifyEmail;
