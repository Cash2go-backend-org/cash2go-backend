const mongoose = require("mongoose");

const ModelSchema = new mongoose.Schema({
  modelName: String,
  modelDescription: String,
  creditScore: {
    operator: String,
    value: String,
  },
  creditToCreditRatio: {
    operator: String,
    value: String,
  },
  creditBalance: {
    operator: String,
    value: String,
  },
  allConditions: Boolean,
  anyCondition: Boolean,
});

const Model = mongoose.model("Model", ModelSchema);

module.exports = Model;
