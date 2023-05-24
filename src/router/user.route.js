const express = require("express");
const userController = require("../controller/user.controller");
const passwordController = require("../controller/resetPasswordController");
const tryCatchHandler = require("../utils/tryCatchHandler");

const router = new express.Router();

router.post("/signup", tryCatchHandler(userController.userSignupController));
router.get("/", (req, res) => {
  res.send("<h1>Welcome to CASH2GO</h1>");
});
router.post("/send-otp", tryCatchHandler(userController.sendVerificationEmail));
router.get("/login", tryCatchHandler(userController.userLoginController));
router.get("/search", tryCatchHandler(userController.searchUser));

//opeyemi
router.post(
  "/reset-password",
  tryCatchHandler(passwordController.resetPasswordController)
);
router.get("/reset-password", (req, res) => {
  // Handle the GET request for reset-password here
  // Return an appropriate response or redirect the user to a password reset page
  res.send("Reset password page");
});

module.exports = { userRouter: router };
