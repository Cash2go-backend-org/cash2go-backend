require("dotenv").config();

const mailerConfig = {
  service: "yahoo",
  auth: {
    user: "hembee999@yahoo.com",
    pass: process.env.YAHOO_PASSWORD,
  },
};

module.exports = mailerConfig;
