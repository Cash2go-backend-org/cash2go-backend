const Joi = require("joi");

const applicantSignupValidator = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().required().email().messages({
    "string.pattern.base": "Email is not a valid email format/address",
  }),
  phoneNumber: Joi.number().required(),
});

module.exports = {
  applicantSignupValidator,
};
