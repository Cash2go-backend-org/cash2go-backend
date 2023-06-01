const { mongoose } = require("mongoose");

const applicantSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    immutable: true,
    validators: {
      match: [
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        "Please add a valid email string to the email path.",
      ],
    },
  },
  phoneNumber: {
    type: Number,
    required: true,
    validators: {
      match: [
        /^[+]{1}(?:[0-9\-\(\)\/\.]\s?){6, 15}[0-9]{1}$/,
        "Please add a valid phone number with a country code to the phone number path.",
      ],
    },
  },
});

const Applicant = mongoose.model("Applicant", applicantSchema);

module.exports = Applicant;
