const crypto = require("crypto");
const bcrypt = require("bcrypt");
const UserModel = require("../../models/user_model");
const TokenModel = require("../../models/token_model");
const sendEmail = require("../../utils/send_email");
const emailVerifyTemplate = require("../../utils/email_verify_template");

const createAccount = async (req, res) => {
  try {
    const {
      userName,
      firstName,
      lastName,
      email,
      newPassword,
      accessibleFarmId,
    } = req.body;

    const [isUserExists] = await UserModel.find({ userName }, { username: 1 });
    if (isUserExists) {
      res.status(400).json({ message: "user already exists" });
      return;
    }

    const [isEmailExists] = await UserModel.find({ email }, { email: 1 });
    if (isEmailExists) {
      res.status(400).json({ message: "email already exists" });
      return;
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(newPassword, salt);

    const user = await new UserModel({
      userName,
      fullName: `${firstName} ${lastName}`,
      email,
      password: hashedPassword,
      accessible_farm_id: accessibleFarmId,
    }).save();

    const userId = user.id;
    const token = crypto.randomBytes(32).toString("hex");

    await TokenModel({ user_id: userId, token }).save();

    //expiring the token after some time

    const template = emailVerifyTemplate(userId, token);

    await sendEmail(email, "Veriy Your Account", template);

    setTimeout(async () => {
      await TokenModel.deleteOne({ user_id: userId });
    }, 50 * 1000);

    res.status(201).json({
      message: "account created successfully",
      userId,
      userEmail: email,
    });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

module.exports = createAccount;
