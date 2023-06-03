const Joi = require("joi");

const ApplicantValidator = Joi.object({
  contact: Joi.string().required(),
  prediction: Joi.string().required(),
});
module.exports = ApplicantValidator;
