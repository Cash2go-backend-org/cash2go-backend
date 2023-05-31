const { mongoose } = require("mongoose");
const Applicant = require("../model/applicant.model");

const predictionSchema = new mongoose.Schema({
  loanRequestAmount: {
    type: String,
  },
  creditScore: {
    type: Number,
  },
  creditUtilization: {
    type: String,
  },
  annualIncome: {
    type: String,
  },
  loanDuration: {
    type: String,
  },
  previousLoanPerfomance: {
    type: String,
  },
  lastLoanApplication: {
    type: String,
  },
  guarantorsCreditScore: {
    type: String,
  },
  isApproved: Boolean,
  isPending: Boolean,
  isRejected: Boolean,
  author: {
    // type: Schema.Types.ObjectId,
    // ref: Applicant,
    type: mongoose.Schema.Types.ObjectId,
    ref: "Applicant",
  },
});

const Prediction = mongoose.model("Prediction", predictionSchema);

module.exports = Prediction;
