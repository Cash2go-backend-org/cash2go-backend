const Joi = require("joi");

const userSignupValidator = Joi.object({
  email: Joi.string()
    .required()
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    .messages({
      "string.pattern.base": "Email is not a valid email format/address",
    }),
  companyID: Joi.string().required(),
  username: Joi.string().required(),
  password: Joi.string().min(8).required().label("Password"),
  confirmPassword: Joi.string()
    .valid(Joi.ref("password"))
    .label("Confirm Password")
    .messages({ "any.only": "{{#label}} does not match" }),
}).strict();

module.exports = { userSignupValidator };
