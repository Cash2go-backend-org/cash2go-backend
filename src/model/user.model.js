const { mongoose } = require("mongoose");
const userInfoSchema = require("../model/userInfo.model");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    immutable: true,
    validators: {
      match: [
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        "Please add a valid email string to the email path.",
      ],
    },
  },
  otp: Number,
  companyID: {
    type: Number,
    required: true,
  },
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  confirmPassword: {
    type: String,
  },
  isVerified: Boolean,
  securityQuestion: {
    type: String,
  },
  securityQuestionAnswer: {
    type: String,
  },
  resetToken: {
    type: String,
  },
  resetTokenExpiration: {
    type: String,
  },
  userInfo: userInfoSchema,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
