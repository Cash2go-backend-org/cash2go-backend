const { google } = require("googleapis");

const CLIENT_ID =
  "588540355315-6p1he1s7709oglpgte1m8idrvvpj7jf9.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URL = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN =
  "L9Ircld_ZicZaa34qVoJxjQUIG5TLrBlgS5H7KcTD6px336f8_MO54p50CcvAB__aE5avgg";
// Set up OAuth2 credentials
const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URL
);

oAuth2Client.setCredentials({
  refresh_token: REFRESH_TOKEN,
});


// Create a transporter using OAuth2
const mailerConfig = {
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: "hembee999@gmail.com",
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    refreshToken: REFRESH_TOKEN,
    accessToken: oAuth2Client.getAccessToken(),
  },
};

module.exports = mailerConfig;
