const express = require("express");
const userController = require("../controller/user.controller");
const passwordController = require("../controller/resetPasswordController");
const tryCatchHandler = require("../utils/tryCatchHandler");
const userAuthMiddleWare = require("../middleware/auth.middleware");

const router = new express.Router();

router.post("/signup", tryCatchHandler(userController.userSignupController));
router.get("/", (req, res) => {
  res.send("<h1>Welcome to CASH2GO</h1>");
});
router.patch("/resend-otp", tryCatchHandler(userController.resendOTP));
router.post("/send-otp", tryCatchHandler(userController.sendVerificationEmail));
router.get("/login", tryCatchHandler(userController.userLoginController));
router.get(
  "/search",
  userAuthMiddleWare,
  tryCatchHandler(userController.searchUser)
);

//opeyemi
router.post(
  "/reset-password",
  tryCatchHandler(passwordController.resetPasswordController)
);
router.post(
  "/update-password/:token",
  tryCatchHandler(passwordController.updatePasswordController)
);

module.exports = { userRouter: router };
