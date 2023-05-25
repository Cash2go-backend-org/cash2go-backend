// const { userSignupValidator } = require("../validators/user.validator");
// const { BadUserRequestError } = require("../error/error");
// const nodemailer = require("nodemailer");
// // const cryptoRandomString = require("crypto-random-string");
// const User = require("../model/user.model");
// const bcrypt = require("bcrypt");

// //opeyemi

// const passwordController = {
//   //reset password request
//   resetPasswordController: async (req, res) => {
//     const { email } = req.body;

//     // Find the user by email
//     const user = await User.findOne({ email });
//     if (!user) {
//       throw new BadUserRequestError("User not found");
//     }

//     // Generate a reset token(10 characters)
//     // Generate a random token
//     const generateToken = (length) => {
//       const characters =
//         "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//       let token = "";

//       for (let i = 0; i < length; i++) {
//         const randomIndex = Math.floor(Math.random() * characters.length);
//         token += characters.charAt(randomIndex);
//       }

//       return token;
//     };

//     const resetToken = generateToken(10); // Generate a 10-character random token

//     // const resetToken = Math.random().toString(36).substring(2, 10);
//     console.log("Generated reset token:", resetToken);

//     // Set the reset token and its expiration time for the user
//     user.resetToken = resetToken;

//     // Token expires in 1 hour
//     user.resetTokenExpiration = Date.now() + 3600000;
//     // await user.save();

//     //new
//     try {
//       await user.save();
//     } catch (error) {
//       throw new Error("Error saving reset token");
//     }
//     // console.log("User resetToken:", user.resetToken);
//     // console.log("User resetTokenExpiration:", user.resetTokenExpiration);

//     // Send the reset link to the user's email
//     const transporter = nodemailer.createTransport({
//       // Email provider details here
//       host: "smtp.gmail.com",
//       port: 465,
//       secure: true,
//       auth: {
//         user: "opeyemireact@gmail.com",
//         pass: "fghvdenjsdprjjwg",
//       },
//     });

//     const resetLink = `http://localhost:3000/api/v1/user/reset-password/${resetToken}`;

//     const mailOptions = {
//       from: "opeyemireact@gmail.com",
//       to: email,
//       subject: "Password Reset",
//       html: `
//         <p>Hello,</p>
//         <p>You have requested to reset your password. Please click the link below to proceed with the password reset:</p>
//         <a href="${resetLink}">${resetLink}</a>
//         <p>If you didn't request this, please ignore this email.</p>
//       `,
//     };

//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         console.error(error);
//         throw new Error("Error sending reset email");
//       }
//       console.log("Reset email sent:", info.response);
//       res.status(200).json({ message: "Email reset link sent" });
//     });
//   },
//   // update password
//   updatePasswordController: async (req, res) => {
//     const { token } = req.params;
//     const { password, confirmPassword } = req.body;

//     console.log("Current time:", Date.now());
//     console.log("Token from URL:", token);

//     // Find the user by the reset token and check the expiration time
//     const user = await User.findOne({
//       resetToken: token,
//       resetTokenExpiration: { $gt: Date.now() },
//     });

//     console.log("User found:", user);
//     //new

//     // console.log("Token expiration:", user.resetTokenExpiration);
//     // console.log("Current time:", Date.now());

//     // //new
//     // console.log("Token from URL:", token);
//     // console.log("User resetToken:", user.resetToken);

//     if (!user) {
//       //new
//       console.error("Invalid or expired reset token:", token);
//       throw new BadUserRequestError("Invalid or expired reset token");
//     }
//     //new
//     // Log the user and token for debugging purposes
//     console.log("User:", user);
//     console.log("Token:", token);

//     // Validate password and confirm password
//     if (password !== confirmPassword) {
//       //new
//       console.error("Passwords do not match");
//       throw new BadUserRequestError("Passwords do not match");
//     }

//     // Hash the new password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Update the user's password and clear the reset token
//     user.password = hashedPassword;
//     user.resetToken = undefined;
//     user.resetTokenExpiration = undefined;
//     await user.save();

//     res.status(200).json({ message: "Password updated successfully" });
//   },
// };

// module.exports = passwordController;

const { userSignupValidator } = require("../validators/user.validator");
const { BadUserRequestError } = require("../error/error");
const nodemailer = require("nodemailer");
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

      // Generate a reset token
      const resetToken = generateResetToken();

      // Set the reset token and its expiration time for the user
      user.resetToken = resetToken;
      user.resetTokenExpiration = Date.now() + 3600000; // Token expires in 1 hour
      await user.save();

      // Send the reset link to the user's email
      const transporter = nodemailer.createTransport({
        // Configure the email provider details here
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: "opeyemireact@gmail.com",
          pass: "fghvdenjsdprjjwg",
        },
      });

      const resetLink = `http://localhost:3000/api/v1/user/reset-password/${resetToken}`;

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
    } catch (error) {
      console.error("Error in resetPasswordController:", error);
      res
        .status(500)
        .json({ message: "Failed to reset password", error: error.message });
    }
  },

  updatePasswordController: async (req, res) => {
    const { token } = req.params;
    console.log("Token from URL:", token);
    // Find the user by the reset token and check the expiration time
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiration: { $gt: Date.now() },
    });
    console.log("User found:", user);
    try {
      // Find the user by the reset token
      const user = await User.findOne({ resetToken: token });

      if (!user) {
        throw new BadUserRequestError("Invalid reset token");
      }

      // Check if the token has expired
      const isTokenExpired =
        user.resetTokenExpiration && user.resetTokenExpiration < Date.now();

      if (isTokenExpired) {
        throw new BadUserRequestError("Expired reset token");
      }

      // Validate password and confirm password
      if (password !== confirmPassword) {
        throw new BadUserRequestError("Passwords do not match");
      }

      // Hash the new password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Update the user's password and clear the reset token
      user.password = hashedPassword;
      user.resetToken = undefined;
      user.resetTokenExpiration = undefined;
      await user.save();

      res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
      console.error("Error in updatePasswordController:", error);
      res.status(error.status || 500).json({
        message:
          error.message || "An error occurred while updating the password",
        status: "Failed",
      });
    }
  },
};

const generateResetToken = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let token = "";
  for (let i = 0; i < 10; i++) {
    token += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return token;
};

module.exports = passwordController;
