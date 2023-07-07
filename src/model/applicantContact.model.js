const mongoose = require("mongoose");

const applicantContactSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    gender: String,
    DOB: String,
    address: String,
    stateOfOrigin: String,
    addressOfEmployer: String,
    phoneNumber: {
      type: Number,
      required: true,
      unique: true, // Add unique index
    },
    nextOfKinPhoneNumber: Number,
    others: String,
  },
  {
    timestamps: true,
  }
);

module.exports = applicantContactSchema;

// const Contact = mongoose.model("Contact", applicantContactSchema);

// module.exports = Contact;
