const { userSignupValidator } = require("../validators/user.validator");
const { BadUserRequestError } = require("../error/error");
const nodemailer = require("nodemailer");
// const cryptoRandomString = require("crypto-random-string");
const User = require("../model/user.model");

//opeyemi

const passwordController = {
  resetPasswordController: async (req, res) => {
    const { email } = req.body;

    // Generate OTP (one-time password)
    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      throw new BadUserRequestError("User not found");
    }

    // Update the user's OTP in the database
    user.otp = otp;
    await user.save();

    // Send OTP to the user's email
    const transporter = nodemailer.createTransport({
      // Configure your email provider details here
      // For example, using SMTP:
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "opeyemireact@gmail.com",
        pass: "fghvdenjsdprjjwg",
      },
    });

    const mailOptions = {
      from: "opeyemireact@gmail.com",
      to: email,
      subject: "Password Reset OTP",
      text: `Your OTP for password reset is: ${otp}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        throw new Error("Error sending OTP");
      }
      console.log("OTP sent:", info.response);
      res.status(200).json({ message: "OTP sent to your email" });
    });
  },
};

module.exports = { passwordController };
