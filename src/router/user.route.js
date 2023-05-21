const express = require("express");
const userController = require("../controller/user.controller");
const tryCatchHandler = require("../utils/tryCatchHandler");

const router = new express.Router();

router.post("/signup", tryCatchHandler(userController.userSignupController));
router.get("/", (req, res) => {
  res.send("<h1>Welcome to CASH2GO</h1>");
});
router.get("/login", tryCatchHandler(userController.userLoginController));
router.get("/search", tryCatchHandler(userController.searchUser))

module.exports = { userRouter: router };
