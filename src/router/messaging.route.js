const express = require("express");
const tryCatchHandler = require("../utils/tryCatchHandler");
const messagingController = require("../controller/messaging.controller");

const router = new express.Router();

router.post("/send-message", tryCatchHandler(messagingController.sendMessage));

module.exports = { messagingRouter: router };
