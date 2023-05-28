const {
  userEmailVerification,
  userSignupValidator,
  userLoginValidator,
  verifyOtpValidator,
} = require("../validators/user.validator");
const { BadUserRequestError, NotFoundError } = require("../error/error");
require("dotenv").config();
const User = require("../model/user.model");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const mailerConfig = require("../config/mailer");
const config = require("../config/index");
const { generateToken } = require("../utils/jwt.utils");

//opeyemi
const { clearTokenCookie } = require("../utils/jwt.utils");

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
    await transporter.sendMail({
      from: "hembee999@gmail.com",
      to: email,
      subject: "CASH2GO OTP Verification",
      html: `<p>Use OTP <b>${otp}</b> to verify your email</p>`,
    });
    const user = await User.create({ email, companyID, otp });

    res
      .status(200)
      .json({ message: "OTP sent to email for verification", data: { user } });
  },

  resendOTP: async (req, res) => {
    const { email } = req.query;
    // Generate new OTP
    const newOtp = Math.floor(Math.random() * 8888 + 1000);
    // Resend OTP email
    await transporter.sendMail({
      from: "hembee999@gmail.com",
      to: email,
      subject: "CASH2GO OTP Verification",
      html: `<p>Use OTP <b>${newOtp}</b> to verify your email</p>`,
    });
    const update = { $set: { otp: newOtp } };

    const user = await User.updateOne({ email: email }, update);

    res.status(200).json({
      message: "OTP resent to email for verification",
      data: { user, newOtp: newOtp },
    });
  },

  verifyOtp: async (req, res) => {
    const { error } = verifyOtpValidator.validate(req.body);
    if (error) throw error;
    const { email } = req.query;
    const user = await User.findOne({ email: email });
    if (!user) throw new BadUserRequestError("invalid email");
    const { otp } = req.body;
    const verifyOtp = await User.findOne({ email: email, otp: otp });
    if (!verifyOtp) throw new BadUserRequestError("invalid OTP");
    await User.updateOne({ email: email }, { isVerified: true });
    res.status(200).json({
      message: "OTP VERIFIED SUCCESSFULLY",
      data: {
        user: verifyOtp,
      },
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

    const { username, password, confirmPassword } = req.body;
    const { email } = req.query;
    const checkIfVerified = await User.findOne({
      email: email,
      isVerified: true,
    });
    if (!checkIfVerified) throw new BadUserRequestError("OTP not verified ");

    const saltRounds = config.bcrypt_salt_round;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);
    const hashedConfirmPassword = bcrypt.hashSync(confirmPassword, saltRounds);

    const newUser = await User.updateOne(
      { email: email, isVerified: true },
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

  securityQuestionController: async (req, res) => {
    const { email } = req.query;
    const { securityQuestion, securityQuestionAnswer } = req.body;
    const user = User.findOne({ email: email });
    if (!user) throw new BadUserRequestError("Invalid Email");
    User.updateOne(
      { email: email },
      {
        securityQuestion,
        securityQuestionAnswer,
      }
    );
    res.status(200).json({
      status: "Success",
      message: "Security question and answer saved successfully",
    });
  },

  userLoginController: async (req, res) => {
    const { error } = userLoginValidator.validate(req.body);
    if (error) throw error;
    const user = await User.findOne({
      email: req.body?.email,
    });
    if (!user) throw new BadUserRequestError("Incorrect email");
    const hash = bcrypt.compareSync(req.body.password, user.password);
    if (!hash) throw new BadUserRequestError("incorrect password");
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
  //opeyemi
  userLogoutController: async (req, res) => {
    clearTokenCookie(res);
    res.status(200).json({ message: "Logout successful" });
  },
};

module.exports = userController;
