const {
  userEmailVerification,
  userSignupValidator,
  userLoginValidator,
} = require("../validators/user.validator");
const { BadUserRequestError, NotFoundError } = require("../error/error");
require("dotenv").config();
const User = require("../model/user.model");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const mailerConfig = require("../config/mailer");
const config = require("../config/index");
const { generateToken } = require("../utils/jwt.utils");

// mailer
const transporter = nodemailer.createTransport(mailerConfig);

const userController = {
  sendVerificationEmail: async (req, res) => {
    const { error } = userEmailVerification.validate(req.body);
    if (error) throw error;
    const { email, companyID } = req.body;
    const emailExists = await User.find({ email });
    if (emailExists.length > 0)
      throw new BadUserRequestError(
        "An account with this email already exists"
      );
    const companyIDExists = await User.find({ companyID });
    if (companyIDExists.length > 0)
      throw new BadUserRequestError("An account with this company ID exists");

    // Generate OTP
    const otp = Math.floor(Math.random() * 8888 + 1000);
    // Send OTP email
    // await transporter.sendMail({
    //   from: "hembee999@outlook.com",
    //   to: email,
    //   subject: "CASH2GO OTP Verification",
    //   html: `<p>Use OTP <b>${otp}</b> to verify your email</p>`,
    // });
    const user = await User.create({ email, companyID, otp });

    res
      .status(200)
      .json({ message: "OTP sent to email for verification", data: { user } });
  },

  resendOTP: async (req, res) => {
    const { email } = req.body;
    // Generate new OTP
    const newOtp = Math.floor(Math.random() * 8888 + 1000);
    // Send OTP email
    // await transporter.sendMail({
    //   from: "hembee999@outlook.com",
    //   to: email,
    //   subject: "CASH2GO OTP Verification",
    //   html: `<p>Use OTP <b>${newOtp}</b> to verify your email</p>`,
    // });
    const update = { $set: { otp: newOtp } };

    const user = await User.updateOne({ email: email }, update);

    res.status(200).json({
      message: "OTP resent to email for verification",
      data: { user, newOtp: newOtp },
    });
  },

  userSignupController: async (req, res) => {
    const { error } = userSignupValidator.validate(req.body);
    if (error) throw error;
    const usernameExists = await User.find({ username: req.body.username });
    if (usernameExists.length > 0)
      throw new BadUserRequestError(
        "An account with this username already exists."
      );

    const { email, otp, companyID, username, password, confirmPassword } =
      req.body;

    const saltRounds = config.bcrypt_salt_round;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);
    const hashedConfirmPassword = bcrypt.hashSync(confirmPassword, saltRounds);

    // Find the user by email and OTP
    const user = await User.findOne({ email, otp, companyID });

    if (!user) {
      res.status(400).json({ error: "Invalid OTP." });
      return;
    }

    const newUser = await User.updateOne(
      { email: email },
      {
        username: username,
        password: hashedPassword,
        confirmPassword: hashedConfirmPassword,
      }
    );
    res.status(201).json({
      message: "A new user has been created successfully",
      status: "Success",
      data: {
        user: newUser,
      },
    });
  },

  userLoginController: async (req, res) => {
    const { error } = userLoginValidator.validate(req.body);
    if (error) throw error;
    const user = await User.findOne({
      email: req.body?.email,
    });
    if (!user) throw new BadUserRequestError("email does not exist");
    const hash = bcrypt.compareSync(req.body.password, user.password);
    if (!hash) throw new BadUserRequestError("email or password is wrong!");
    res.status(200).json({
      message: "User login successful",
      status: "Success",
      data: {
        user: user,
        access_token: generateToken(user),
      },
    });
  },

  searchUser: async (req, res) => {
    const user = await User.findOne({ username: req.query?.username });
    if (!user) throw new NotFoundError("User not found");

    res.status(200).json({
      message: "User found successfully",
      status: "Success",
      data: {
        user,
      },
    });
  },
};

module.exports = userController;
