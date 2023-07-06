const Joi = require("joi");

const modelValidator = Joi.object({
  modelName: Joi.string(),
  modelDescription: Joi.string(),
  creditScore: Joi.object({
    operator: Joi.string(),
    value: Joi.string(),
  }),
  annualIncome: Joi.object({
    operator: Joi.string(),
    value: Joi.number(),
  }),
  guarantorsCreditScore: Joi.object({
    operator: Joi.string(),
    value: Joi.number(),
  }),
  allConditions: Joi.boolean(),
  anyCondition: Joi.boolean(),
});

const predictionValidator = Joi.object({
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
  modelValidator,
  predictionValidator,
};
