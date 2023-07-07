// const Joi = require("joi");

// const ApplicantValidator = Joi.object({
//   contact: Joi.object({
//     firstName: Joi.string().required(),
//     lastName: Joi.string().required(),
//     gender: Joi.string(),
//     DOB: Joi.string(),
//     address: Joi.string(),
//     stateOfOrigin: Joi.string(),
//     adressOfEmployer: Joi.string(),
//     phoneNumber: Joi.string().required(),
//     nextOfKinPhoneNumber: Joi.string(),
//     others: Joi.string(),
//   }).required(),
//   newPrediction: Joi.object({
//     creditScore: Joi.object({
//       value: Joi.number(),
//     }),
//     annualIncome: Joi.object({
//       value: Joi.number(),
//     }),
//     guarantorsCreditScore: Joi.object({
//       value: Joi.number(),
//     }),
//   }),
// });
// module.exports = ApplicantValidator;

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
  creditScore: Joi.object({
    value: Joi.number(),
  }),
  annualIncome: Joi.object({
    value: Joi.number(),
  }),
  guarantorsCreditScore: Joi.object({
    value: Joi.number(),
  }),
});

module.exports = {
  contactValidator,
  newPredictionValidator,
};
