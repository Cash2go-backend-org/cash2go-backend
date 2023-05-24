const development = require("./development");
const production = require("./production");
require("dotenv").config();

const environment = process.env.NODE_ENV;

let config;
if (!environment) throw new Error("No environment setup on the SERVER!!!");

console.log(`Server setup to ${environment}!!!`);

if (environment.trim() === "production") {
  config = { ...production };
}
if (environment.trim() === "development") {
  config = { ...development };
}

module.exports = config;
