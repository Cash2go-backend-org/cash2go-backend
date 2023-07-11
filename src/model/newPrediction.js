const mongoose = require("mongoose");
const Applicant = require("./applicantContact.model");

const newPredictionSchema = new mongoose.Schema({
  modelName: String,
  modelDescription: String,
  creditScore: {
    operator: String,
    value: Number,
  },
  annualIncome: {
    operator: String,
    value: Number,
  },
  guarantorsCreditScore: {
    operator: String,
    value: Number,
  },
  allConditions: Boolean,
  anyCondition: Boolean,
  isApproved: Boolean,
  isRejected: Boolean,
});

module.exports = newPredictionSchema;
