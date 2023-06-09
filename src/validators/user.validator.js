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
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
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
  device: Joi.string().optional(),
  ip: Joi.string().optional(),
  location: Joi.string().optional(),
}).strict();

const userLoginValidator = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required(),
  device: Joi.string().optional(),
  ip: Joi.string().optional(),
  location: Joi.string().optional(),
});

const securityQuestionandAnswerValidator = Joi.object({
  securityQuestion: Joi.string().required(),
  securityQuestionAnswer: Joi.string().required(),
});

const verifyEmailValidator = Joi.object({
  email: Joi.string().required().email().message({
    "string.pattern.base": "Invalid email format",
  }),
});

const updatePasswordValidator = Joi.object({
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
    .messages({ "any.only": "Passwords does not match" }),
});

const infoValidator = Joi.object({
  firstName: Joi.string(),
  lastName: Joi.string(),
  email: Joi.string(),
  homeAddress: {
    address: Joi.string(),
    city: Joi.string(),
    state: Joi.string(),
    country: Joi.string(),
    zipCode: Joi.number(),
  },
});

module.exports = {
  userEmailVerification,
  verifyOtpValidator,
  userSignupValidator,
  userLoginValidator,
  verifyEmailValidator,
  updatePasswordValidator,
  securityQuestionandAnswerValidator,
  infoValidator,
};
