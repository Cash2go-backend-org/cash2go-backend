const express = require("express");
const userController = require("../controller/user.controller");
const tryCatchHandler = require("../utils/tryCatchHandler");

const router = new express.Router();

router.post("/signup", tryCatchHandler(userController.userSignupController));
router.get("/", (req, res) => {
    res.send("Hello cash2go")
});

module.exports = { userRouter: router };
