const express = require("express");
const userController = require("../controller/user.controller");
const passwordController = require("../controller/resetPasswordController");
const tryCatchHandler = require("../utils/tryCatchHandler");
const userAuthMiddleWare = require("../middleware/auth.middleware");

const router = new express.Router();

router.get("/", (req, res) => {
  res.send("<h1>Welcome to CASH2GO</h1>");
});
router.post("/send-otp", tryCatchHandler(userController.sendVerificationEmail));
router.patch("/signup", tryCatchHandler(userController.userSignupController));
router.patch("/verify-otp", tryCatchHandler(userController.verifyOtp));
router.patch(
  "/security-question",
  tryCatchHandler(userController.securityQuestionController)
);
router.post("/login", tryCatchHandler(userController.userLoginController));
router.get(
  "/search",
  // userAuthMiddleWare,
  tryCatchHandler(userController.searchUser)
);

//opeyemi

router.post(
  "/verify-email",
  tryCatchHandler(passwordController.verifyEmailController)
);
router.patch(
  "/reset-password",
  tryCatchHandler(passwordController.resetPasswordController)
);
router.patch(
  "/update-password/:token",
  // userAuthMiddleWare,
  tryCatchHandler(passwordController.updatePasswordController)
);
router.post("/logout", tryCatchHandler(userController.userLogoutController));

module.exports = { userRouter: router };
