const mongoose = require("mongoose");

const newPredictionSchema = new mongoose.Schema({
  creditScore: Number,
  annualIncome: Number,
  guarantorsCreditScore: Number,
  loanRequestAmount: Number,
  creditUtilization: String,
  loanDuration: String,
  previousLoanPerfomance: String,
  lastLoanApplication: String,
  isApproved: Boolean,
  isRejected: Boolean,
});

module.exports = newPredictionSchema;
