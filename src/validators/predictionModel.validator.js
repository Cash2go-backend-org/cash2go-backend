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

module.exports = {
  modelValidator,
};
