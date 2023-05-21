const {
  userSignupValidator,
  userLoginValidator,
} = require("../validators/user.validator");
const { BadUserRequestError } = require("../error/error");
require("dotenv").config();
const User = require("../model/user.model");
const bcrypt = require("bcrypt");

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
    const saltRounds = Number(process.env.bycrypt_salt_round);
    const hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);
    const hashedConfirmPassword = bcrypt.hashSync(
      req.body.confirmPassword,
      saltRounds
    );

    const user = {
      email: req.body.email,
      companyID: req.body.companyID,
      username: req.body.username,
      password: hashedPassword,
      confirmPassword: hashedConfirmPassword,
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
        user,
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
