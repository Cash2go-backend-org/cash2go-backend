const Joi = require("joi");

const ApplicantValidator = Joi.object({
  contact: Joi.object({
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
  }).required(),
  prediction: Joi.object({
    loanRequestAmount: Joi.number(),
    creditScore: Joi.number(),
    creditUtilization: Joi.string(),
    annualIncome: Joi.number(),
    loanDuration: Joi.string(),
    previousLoanPerfomance: Joi.string(),
    lastLoanApplication: Joi.string(),
    guarantorsCreditScore: Joi.number(),
    isApproved: Joi.boolean(),
    isPending: Joi.boolean(),
    isRejected: Joi.boolean(),
  }).required(),
});
module.exports = ApplicantValidator;
