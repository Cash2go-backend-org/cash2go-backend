const { mongoose } = require("mongoose");

const messagingSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: false,
    lowercase: true,
    validators: {
      match: [
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        "Please add a valid email string to the email path.",
      ],
    },
  },
  title: {
    type: String,
  },
  body: {
    type: String,
  },
});

const Messaging = mongoose.model("Messaging", messagingSchema);

module.exports = Messaging;
