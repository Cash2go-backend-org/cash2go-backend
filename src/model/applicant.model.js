const mongoose = require("mongoose");

const applicantSchema = new mongoose.Schema({
  firstName: String,
  lastName:  String,
  gender: String,
  DOB: String,
  address: String,
  stateOfOrigin: String,
  adressOfEmployer: String,
  phoneNumber:  Number,
  nextOfKinPhoneNumber: Number,
  others: String,
});

const Applicant = mongoose.model("Applicant", applicantSchema);

module.exports = Applicant;
