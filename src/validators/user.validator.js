const Joi = require("joi");

const userEmailVerification = Joi.object({
  email: Joi.string().required().email().messages({
    "string.pattern.base": "Email is not a valid email format/address",
  }),
  companyID: Joi.number().required(),
});

const verifyOtpValidator = Joi.object({
  otp: Joi.number().required(),
});

const userSignupValidator = Joi.object({
  // email: Joi.string().required().email().messages({
  //   "string.pattern.base": "Email is not a valid email format/address",
  // }),
  // companyID: Joi.number().required(),
  // otp: Joi.number(),
  username: Joi.string().required(),
  password: Joi.string()
    .min(8)
    .required()
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/
    )
    .message(
      "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character"
    ),
  confirmPassword: Joi.string()
    .valid(Joi.ref("password"))
    .required()
    .messages({ "any.only": "Passwords do not match" }),
}).strict();

const userLoginValidator = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required(),
});

module.exports = {
  userEmailVerification,
  verifyOtpValidator,
  userSignupValidator,
  userLoginValidator,
};
