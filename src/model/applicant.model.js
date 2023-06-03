const mongoose = require("mongoose");

const ApplicantSchema = new mongoose.Schema({
  contact: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Contact",
    required: true,
  },
  prediction: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Prediction",
    required: true,
  },
});

const Applicant = mongoose.model("Applicant", ApplicantSchema);

module.exports = Applicant;