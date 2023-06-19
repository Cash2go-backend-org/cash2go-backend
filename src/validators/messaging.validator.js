const Joi = require("joi");

const messagingValidator = Joi.object({
  email: Joi.string().required().email().messages({
    "string.pattern.base": "Email is not a valid email format/address",
  }),
  title: Joi.string().required(),
  body: Joi.string().required(),
});

module.exports = {
  messagingValidator,
};
