const mongoose = require("mongoose");
const moment = require('moment');
const applicantContactSchema = require("./applicantContact.model");
const predictionSchema = require("./prediction.model");

const ApplicantSchema = new mongoose.Schema({
  contact: applicantContactSchema,
  prediction: predictionSchema,
  applicationDate: {
    type: Date,
    default: Date.now,
  },
  applicationID: {
    type: Number,
    unique: true,
    min: 100000000,
    max: 999999999,
  },
});

ApplicantSchema.pre("save", function (next) {
  if (!this.applicationID) {
    this.applicationID = Math.floor(Math.random() * 900000000 + 100000000);
  }
  this.applicationDate = moment(this.applicationDate).format("DD/MM/YY");

  next();
});

const Applicant = mongoose.model("Applicant", ApplicantSchema);

module.exports = Applicant;
