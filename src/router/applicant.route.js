const express = require("express");
const applicantController = require("../controller/applicant.controller");
const tryCatchHandler = require("../utils/tryCatchHandler");

const router = new express.Router();

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
router.get(
  "/applicants",
  tryCatchHandler(applicantController.getAllApplicantsController)
);

module.exports = { applicantRouter: router };
