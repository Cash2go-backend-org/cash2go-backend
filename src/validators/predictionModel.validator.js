const Joi = require("joi");

const modelValidator = Joi.object({
  modelName: Joi.string(),
  modelDescription: Joi.string(),
  creditScore: Joi.object({
    operator: Joi.string(),
    value: Joi.string(),
  }),
  creditToCreditRatio: Joi.object({
    operator: Joi.string(),
    value: Joi.string(),
  }),
  creditBalance: Joi.object({
    operator: Joi.string(),
    value: Joi.string(),
  }),
  allConditions: Joi.boolean(),
  anyCondition: Joi.boolean(),
});

module.exports = modelValidator;
