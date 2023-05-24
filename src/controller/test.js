const User = require("../models/user");
const nodemailer = require("nodemailer");
const otpGenerator = require("otp-generator");

// Create a transporter using your nodemailer configuration
const transporter = nodemailer.createTransport({
  // Your nodemailer configuration options
});

const signupController = {
  sendVerificationEmail: async (req, res) => {
    const { email } = req.body;

    // Generate OTP
    const otp = otpGenerator.generate(6, {
      digits: true,
      alphabets: false,
      upperCase: false,
      specialChars: false,
    });

    try {
      // Send OTP email
      await transporter.sendMail({
        from: "your-email@example.com",
        to: email,
        subject: "Email Verification",
        text: `Your OTP for email verification: ${otp}`,
      });

      // Create user document with email and OTP
      await User.create({ email, "emailVerification.otp": otp });

      res.status(200).json({ message: "OTP sent to email for verification" });
    } catch (error) {
      console.error("Error sending verification email:", error);
      res.status(500).json({ error: "Failed to send verification email" });
    }
  },

  verifyEmail: async (req, res) => {
    const { email, otp, username, password } = req.body;

    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ error: "User not found" });
      }

      // Verify the provided OTP
      if (user.emailVerification.otp === otp) {
        // Mark email as verified
        user.emailVerification.verified = true;
        await user.save();

        // Proceed with user registration
        // Create the user document with username and password
        const newUser = await User.create({ email, username, password });

        res.status(200).json({ message: "User registered successfully" });
      } else {
        res.status(400).json({ error: "Invalid OTP" });
      }
    } catch (error) {
      console.error("Error verifying email:", error);
      res.status(500).json({ error: "Failed to verify email" });
    }
  },
};

module.exports = signupController;
