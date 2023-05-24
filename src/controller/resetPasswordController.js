const { userSignupValidator } = require("../validators/user.validator");
const { BadUserRequestError } = require("../error/error");
const nodemailer = require("nodemailer");
// const cryptoRandomString = require("crypto-random-string");
const User = require("../model/user.model");

//opeyemi

const passwordController = {
  resetPasswordController: async (req, res) => {
    const { email } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      throw new BadUserRequestError("User not found");
    }

    // Generate a reset token
    const resetToken = Math.random().toString(36).substr(2, 10); // Generate a 10-character token

    // Set the reset token and its expiration time for the user
    user.resetToken = resetToken;
    user.resetTokenExpiration = Date.now() + 3600000; // Token expires in 1 hour
    await user.save();

    // Send the reset link to the user's email
    const transporter = nodemailer.createTransport({
      // Configure your email provider details here
      // For example, using SMTP:
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "opeyemireact@gmail.com",
      },
    });

    const resetLink = `http://localhost:3000/api/v1/user/reset-password/${resetToken}`; // Replace with your actual reset password page URL

    const mailOptions = {
      from: "opeyemireact@gmail.com",
      to: email,
      subject: "Password Reset",
      html: `
        <p>Hello,</p>
        <p>You have requested to reset your password. Please click the link below to proceed with the password reset:</p>
        <a href="${resetLink}">${resetLink}</a>
        <p>If you didn't request this, please ignore this email.</p>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        throw new Error("Error sending reset email");
      }
      console.log("Reset email sent:", info.response);
      res.status(200).json({ message: "Reset email sent" });
    });
  },
};

module.exports = passwordController;