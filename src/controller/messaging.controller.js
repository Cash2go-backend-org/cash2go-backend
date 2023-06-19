const { messagingValidator } = require("../validators/messaging.validator");
const { BadUserRequestError } = require("../error/error");
require("dotenv").config();
const User = require("../model/user.model");
const Messaging = require("../model/messaging.model");
const nodemailer = require("nodemailer");
const mailerConfig = require("../config/mailer");
const transporter = nodemailer.createTransport(mailerConfig);

const messagingController = {
  sendMessage: async (req, res) => {
    const { error } = messagingValidator.validate(req.body);
    if (error) throw error;
    const { email, title, body } = req.body;
    const user = await User.findOne({ email });
    if (!user) throw new BadUserRequestError("User not found");
    const userMessage = await Messaging.create(req.body);
    await transporter.sendMail({
      from: "hembee999@gmail.com",
      to: email,
      subject: title,
      text: body,
    });

    res.status(200).json({
      message: "Email sent successfully",
      data: {
        userMessage,
      },
    });
  },
};

module.exports = messagingController;
