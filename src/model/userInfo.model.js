const mongoose = require("mongoose");

const userInfoSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    validators: {
      match: [
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        "Please add a valid email string to the email path.",
      ],
    },
  },
  homeAddress: {
    address: String,
    city: String,
    state: String,
    country: String,
    zipCode: Number,
  },
});


module.exports = userInfoSchema;
