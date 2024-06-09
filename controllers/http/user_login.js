const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const UserModel = require("../../models/user_model");
const TokenModel = require("../../models/token_model");
const FarmModel = require("../../models/farm_model");
const emailVerifyTemplate = require("../../utils/email_verify_template");
const accountAproveTemplate = require("../../utils/account_aprove_template");
const sendEmail = require("../../utils/send_email");

const userLogin = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const [user] = await UserModel.find({ userName });
    if (!user) {
      res.status(404).json({ message: "user not found" });
      return;
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      res.status(401).json({ message: "incorrect password" });
      return;
    }

    if (!user.emailVerified) {
      const email = user.email;
      const userId = user.id;
      const token = crypto.randomBytes(32).toString("hex");

      await TokenModel({ user_id: userId, token }).save();

      const template = emailVerifyTemplate(userId, token);
      await sendEmail(email, "Verify your email", template);

      setTimeout(async () => {
        await TokenModel.deleteOne({ user_id: userId });
      }, 50 * 1000);

      res.status(403).json({
        type: "email_verification",
        message: "email not verified",
        userId: user._id.toString(),
        userEmail: user.email,
      });
      return;
    }

    if (!user.accountAproved) {
      const farm = await FarmModel.findById(user.accessible_farm_id, {
        farm_name: 1,
      });

      const adminEmail = process.env.ADMIN_EMAIL;
      const userId = user.id;
      const userName = user.userName;
      const fullName = user.fullName;
      const email = user.email;
      const accessTo = farm.farm_name;

      const template = accountAproveTemplate(
        userId,
        userName,
        fullName,
        email,
        accessTo
      );
      await sendEmail(adminEmail, "Verify new account", template);
      res.status(403).json({
        type: "admin_aprove",
        message: "admin not aproved",
        userId: user._id.toString(),
      });
      return;
    }
    const payload = {
      userId: user._id,
      userName: user.userName,
      email: user.email,
    };

    const token = jwt.sign(payload, process.env.SECRETE_KEY);

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        expires: new Date(Date.now() + 360 * 24 * 60 * 60 * 100),
      })
      .status(200)
      .json({ message: "login successful" });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

module.exports = userLogin;
