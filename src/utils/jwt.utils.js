const jwt = require("jsonwebtoken");
const config = require("../config/index.js");

function generateToken(user) {
  const payload = {
    _id: user._id,
    email: user.email,
    username: user.username,
  };
  const token = jwt.sign(payload, config.jwt_secret_key, {
    expiresIn: 60 * 60 * 24,
  });
  return token;
}

function verifyToken(token) {
  return jwt.verify(token, config.jwt_secret_key);
}

module.exports = { generateToken, verifyToken };
