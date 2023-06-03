const Joi = require("joi");

const applicantSignupValidator = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  gender: Joi.string(),
  DOB: Joi.string(),
  address: Joi.string(),
  stateOfOrigin: Joi.string(),
  adressOfEmployer: Joi.string(),
  phoneNumber: Joi.string().required(),
  nextOfKinPhoneNumber: Joi.string(),
  others: Joi.string(),
});

module.exports = {
  applicantSignupValidator,
};
