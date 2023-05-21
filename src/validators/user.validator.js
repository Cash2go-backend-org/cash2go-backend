const Joi = require("joi");

const userSignupValidator = Joi.object({
  email: Joi.string().required().email().messages({
    "string.pattern.base": "Email is not a valid email format/address",
  }),
  companyID: Joi.string().required(),
  username: Joi.string().required(),
  password: Joi.string()
    .min(8)
    .required()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  confirmPassword: Joi.string()
    .valid(Joi.ref("password"))
    .required()
    .messages({ "any.only": "Passwords do not match" }),
}).strict();

module.exports = { userSignupValidator };
