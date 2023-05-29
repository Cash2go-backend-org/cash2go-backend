const express = require("express");
const applicantController = require("../controller/applicant.controller");
const tryCatchHandler = require("../utils/tryCatchHandler");

const router = new express.Router();

// router.get("/", (req, res) => {
//   res.send("<h1>Welcome to CASH2GO</h1>");
// });

//applicant
router.post(
  "/applicant-signup",
  tryCatchHandler(applicantController.applicantSignupController)
);
router.get(
  "/search-applicant",
  tryCatchHandler(applicantController.searchApplicantController)
);
router.get(
  "/applicant-contact-details",
  tryCatchHandler(applicantController.getApplicantDetailsController)
);

module.exports = { applicantRouter: router };
