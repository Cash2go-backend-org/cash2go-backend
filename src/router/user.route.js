const express = require("express");
const userController = require("../controller/user.controller");
const tryCatchHandler = require("../utils/tryCatchHandler");
const userAuthMiddleWare = require("../middleware/auth.middleware");

const router = new express.Router();

router.patch("/signup", tryCatchHandler(userController.userSignupController));
router.get("/", (req, res) => {
  res.send("<h1>Welcome to CASH2GO</h1>");
});
router.post("/send-otp", tryCatchHandler(userController.sendVerificationEmail));
router.get("/login", tryCatchHandler(userController.userLoginController));
router.get(
  "/search",
  userAuthMiddleWare,
  tryCatchHandler(userController.searchUser)
);

module.exports = { userRouter: router };
