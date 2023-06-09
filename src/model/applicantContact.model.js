const mongoose = require("mongoose");

const applicantContactSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  gender: String,
  DOB: String,
  address: String,
  stateOfOrigin: String,
  adressOfEmployer: String,
  phoneNumber: Number,
  nextOfKinPhoneNumber: Number,
  others: String,
});


module.exports = applicantContactSchema
