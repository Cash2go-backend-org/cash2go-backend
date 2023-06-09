const mongoose = require("mongoose");
const Applicant = require("./applicantContact.model");

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
});

module.exports = predictionSchema;
