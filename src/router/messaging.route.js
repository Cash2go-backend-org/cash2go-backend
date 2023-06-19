const express = require("express");
const tryCatchHandler = require("../utils/tryCatchHandler");
const messagingController = require("../controller/messaging.controller");

const router = new express.Router();

router.post("/send-message", tryCatchHandler(messagingController.sendMessage));
router.get("/get-messages", tryCatchHandler(messagingController.getMessages));

module.exports = { messagingRouter: router };
