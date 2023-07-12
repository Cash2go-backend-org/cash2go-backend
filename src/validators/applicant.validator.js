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
  creditScore: Joi.number(),
  annualIncome: Joi.number(),
  guarantorsCreditScore: Joi.number(),
  loanRequestAmount: Joi.number(),
  creditUtilization: Joi.string(),
  loanDuration: Joi.string(),
  previousLoanPerfomance: Joi.string(),
  lastLoanApplication: Joi.string(),
  isApproved: Joi.boolean(),
  isRejected: Joi.boolean(),
});

module.exports = {
  contactValidator,
  newPredictionValidator,
};
