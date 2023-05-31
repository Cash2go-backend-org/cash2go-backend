const express = require("express");
const predictionController = require("../controller/prediction.controller");
const tryCatchHandler = require("../utils/tryCatchHandler");

const router = new express.Router();

router.post(
  "/applicant-prediction",
  tryCatchHandler(predictionController.createPrediction)
);

module.exports = { predictionRouter: router };
