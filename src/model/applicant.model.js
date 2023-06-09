const mongoose = require("mongoose");
const applicantContactSchema = require("./applicantContact.model");
const predictionSchema = require("./prediction.model");


const ApplicantSchema = new mongoose.Schema({
  contact: applicantContactSchema,
  prediction: predictionSchema,
});

const Applicant = mongoose.model("Applicant", ApplicantSchema);

module.exports = Applicant;