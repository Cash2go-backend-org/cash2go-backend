const Joi = require("joi");

const contactValidator = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  gender: Joi.string(),
  DOB: Joi.string(),
  address: Joi.string(),
  stateOfOrigin: Joi.string(),
  addressOfEmployer: Joi.string(),
  phoneNumber: Joi.string().required(),
  nextOfKinPhoneNumber: Joi.string(),
  others: Joi.string(),
}).required();

const newPredictionValidator = Joi.object({
  creditScore: Joi.number().required(),
  annualIncome: Joi.number().required(),
  guarantorsCreditScore: Joi.number().required(),
  loanRequestAmount: Joi.number().required(),
  creditUtilization: Joi.string().required(),
  loanDuration: Joi.string().required(),
  previousLoanPerfomance: Joi.string().required(),
  lastLoanApplication: Joi.string().required(),
  isApproved: Joi.boolean(),
  isRejected: Joi.boolean(),
});

module.exports = {
  contactValidator,
  newPredictionValidator,
};
