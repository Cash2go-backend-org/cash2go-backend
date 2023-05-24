const { userSignupValidator } = require("../validators/user.validator");
const { BadUserRequestError } = require("../error/error");
const User = require("../model/user.model");

//opeyemi
// const nodemailer = require("nodemailer");
// const cryptoRandomString = require("crypto-random-string");

const userController = {
  userSignupController: async (req, res) => {
    const { error, value } = userSignupValidator.validate(req.body);
    if (error) throw error;
    const emailExists = await User.find({ email: req.body.email });
    if (emailExists.length > 0)
      throw new BadUserRequestError(
        "An account with this email already exists"
      );
    const companyIDExists = await User.find({ companyID: req.body.companyID });
    if (companyIDExists.length > 0)
      throw new BadUserRequestError("An account with this company ID exists");
    const usernameExists = await User.find({ username: req.body.username });
    if (usernameExists.length > 0)
      throw new BadUserRequestError(
        "An account with this username already exists."
      );
    const user = {
      email: req.body.email,
      companyID: req.body.companyID,
      username: req.body.username,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
    };

    const newUser = await User.create(user);
    res.status(201).json({
      message: "A new user has been created successfully",
      status: "Success",
      data: {
        user: newUser,
      },
    });
  },
};

module.exports = userController;
