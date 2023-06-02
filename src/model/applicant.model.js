const { mongoose } = require("mongoose");

const applicantSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  gender: String,
  DOB: String,
  address: String,
  stateOfOrigin: String,
  adressOfEmployer: String,
  phoneNumber: {
    type: Number,
  },
  nextOfKinPhoneNumber: {
    type: Number,
    validators: {
      match: [
        /^[+]{1}(?:[0-9\-\(\)\/\.]\s?){6, 15}[0-9]{1}$/,
        "Please add a valid phone number with a country code to the phone number path.",
      ],
    },
  },
  others: String,
});

const Applicant = mongoose.model("Applicant", applicantSchema);

module.exports = Applicant;
