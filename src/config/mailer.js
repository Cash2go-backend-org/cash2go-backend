const { google } = require("googleapis");

// Set up OAuth2 credentials
const oAuth2Client = new google.auth.OAuth2(
  // CLIENT ID
  "588540355315-6p1he1s7709oglpgte1m8idrvvpj7jf9.apps.googleusercontent.com",
  // CLIENT SECRET
  "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",
  // REDIRECT URL
  "https://developers.google.com/oauthplayground"
);

// Create a transporter using OAuth2
const mailerConfig = {
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: "hembee999@gmail.com",
    clientId:
      "588540355315-6p1he1s7709oglpgte1m8idrvvpj7jf9.apps.googleusercontent.com",
    clientSecret: "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",
    refreshToken:
      "1//04h-prs7Rzj7FCgYIARAAGAQSNwF-L9IrCLSMRhL5RaEKdEjhQR_Xlpgso8KGSxKH-RaNRH8FVBXTNw0xn-1rpgyMEiB2fEjWZQw",
    accessToken: oAuth2Client.getAccessToken(),
  },
};

module.exports = mailerConfig;
