const { BadUserRequestError } = require("../error/error");
const nodemailer = require("nodemailer");
const mailerConfig = require("../config/mailer");
const User = require("../model/user.model");

const passwordController = {
  resetPasswordController: async (req, res) => {
    try {
      const { email } = req.body;

      // Find the user by email
      const user = await User.findOne({ email });
      if (!user) {
        throw new BadUserRequestError("User not found");
      }
      const generateResetToken = () => {
        const characters =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let token = "";
        for (let i = 0; i < 10; i++) {
          token += characters.charAt(
            Math.floor(Math.random() * characters.length)
          );
        }
        return token;
      };
      // Generate a reset token
      const resetToken = generateResetToken();

      // Set the reset token and its expiration time for the user
      const newUser = {
        resetToken: resetToken,
        resetTokenExpiration: Date.now() + 3600000, // Token expires in 1 hour
      };

      await User.updateOne({ email: email }, newUser);

      // Send the reset link to the user's email
      const transporter = nodemailer.createTransport(mailerConfig);

      const resetLink = `http://cash2go-backendd.onrender.com/api/v1/user/update-password/${resetToken}`;

      const mailOptions = {
        from: "hembee999@gmail.com",
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
        res.status(200).json({
          message: "Reset email sent",
          data: {
            user: user,
            message: mailOptions,
          },
        });
      });
    } catch (error) {
      console.error("Error in resetPasswordController:", error);
      res
        .status(500)
        .json({ message: "Failed to reset password", error: error.message });
    }
  },
  updatePasswordController: async (req, res) => {
    try {
      const token = req.params.token;
      const { email, password, confirmPassword } = req.body;
      // Find the user by the reset token
      const user = await User.findOne({ email: email, resetToken: token });
      if (!user) {
        throw new BadUserRequestError("Invalid or expired reset token");
      }
      // Check if the reset token has expired
      if (user.resetTokenExpiration < Date.now()) {
        throw new BadUserRequestError("Reset token has expired");
      }
      // Update the user's password
      await User.updateOne(
        { email: email },
        {
          password: password,
          confirmPassword: confirmPassword,
          resetToken: undefined,
          resetTokenExpiration: undefined,
        }
      );

      res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
      console.error("Error in updatePasswordController:", error);
      res.status(500).json({
        message:
          error.message || "An error occurred while updating the password",
      });
    }
  },
};

module.exports = passwordController;
