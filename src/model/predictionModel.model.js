const mongoose = require("mongoose");

const ModelSchema = new mongoose.Schema({
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
  isSelected: Boolean,
  allConditions: Boolean,
  anyCondition: Boolean,
});

const Model = mongoose.model("Model", ModelSchema);

module.exports = Model;
