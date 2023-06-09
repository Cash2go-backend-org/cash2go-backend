const express = require("express");
const tryCatchHandler = require("../utils/tryCatchHandler");
const applicantController = require("../controller/applicant.controller");

const router = new express.Router();

// Mubarak
router.post(
  "/create-applicant",
  tryCatchHandler(applicantController.createApplicantController)
);
router.get(
  "/contact/:id",
  tryCatchHandler(applicantController.getApplicantContact)
);
router.get(
  "/prediction/:id",
  tryCatchHandler(applicantController.getApplicantPrediction)
);

router.get(
  "/approved-applicants",
  tryCatchHandler(applicantController.getApprovedApplicants)
);
router.get(
  "/pending-applicants",
  tryCatchHandler(applicantController.getPendingApplicants)
);
router.get(
  "/rejected-applicants",
  tryCatchHandler(applicantController.getRejectedApplicants)
);
router.get(
  "/applicants",
  tryCatchHandler(applicantController.getAllApplicants)
);

module.exports = { applicantRouter: router };
