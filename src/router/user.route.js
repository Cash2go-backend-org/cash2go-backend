const express = require("express");
const userController = require("../controller/user.controller");
const tryCatchHandler = require("../utils/tryCatchHandler");
const userAuthMiddleWare = require("../middleware/auth.middleware");

const router = new express.Router();
router.post("/send-otp", tryCatchHandler(userController.sendVerificationEmail));
router.patch("/resend-otp", tryCatchHandler(userController.resendOTP));
router.patch("/signup", tryCatchHandler(userController.userSignupController));
router.post("/login", tryCatchHandler(userController.userLoginController));
router.get(
  "/search",
  // userAuthMiddleWare,
  tryCatchHandler(userController.searchUser)
);
router.get("/", (req, res) => {
  res.send("<h1>Welcome to CASH2GO</h1>");
});
module.exports = { userRouter: router };
