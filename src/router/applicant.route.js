const express = require("express");
const contactController = require("../controller/applicantContact.controller");
const tryCatchHandler = require("../utils/tryCatchHandler");
const applicantController = require("../controller/applicant.controller");
const predictionController = require("../controller/prediction.controller");

const router = new express.Router();

//applicant contact
router.post(
  "/applicant-contact",
  tryCatchHandler(contactController.applicantContactController)
);
router.get(
  "/search-applicant",
  tryCatchHandler(contactController.searchApplicantController)
);
router.get(
  "/applicant-contact-details",
  tryCatchHandler(contactController.getApplicantContactDetailsController)
);
router.get(
  "/applicants",
  tryCatchHandler(contactController.getAllApplicantsController)
);

//applicant prediction details

router.post(
  "/applicant-prediction",
  tryCatchHandler(predictionController.createPrediction)
);

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

module.exports = { applicantRouter: router };
