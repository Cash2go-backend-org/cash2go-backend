const Joi = require("joi");

const predictionValidator = Joi.object({
  loanRequestAmount: Joi.number(),
  creditScore: Joi.number(),
  creditUtilization: Joi.string(),
  annualIncome: Joi.number(),
  loanDuration: Joi.string(),
  previousLoanPerfomance: Joi.string(),
  lastLoanApplication: Joi.string(),
  gurantorsCreditScore: Joi.number(),
  isApproved: Joi.boolean(),
  isPending: Joi.boolean(),
  isRejected: Joi.boolean(),
});

module.exports = { predictionValidator };
