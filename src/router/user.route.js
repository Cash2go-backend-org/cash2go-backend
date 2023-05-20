const express = require("express");
const userController = require("../controller/user.controller");
const tryCatchHandler = require("../utils/tryCatchHandler");


const router = express.Router();

router.post("/signup", tryCatchHandler(userController.userSignupController));

module.exports = { userRouter: router };
