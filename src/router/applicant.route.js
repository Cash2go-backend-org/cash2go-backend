const express = require("express");
const tryCatchHandler = require("../utils/tryCatchHandler");
const applicantController = require("../controller/applicant.controller");
const modelController = require("../controller/predictionModel.controller");

const router = new express.Router();

// router.post(
//   "/create-applicant",
//   tryCatchHandler(applicantController.createApplicantController)
// );
router.get(
  "/contact/:id",
  tryCatchHandler(applicantController.getApplicantContact)
);
// router.get(
//   "/prediction/:id",
//   tryCatchHandler(applicantController.getApplicantPrediction)
// );

router.get(
  "/approved-applicants",
  tryCatchHandler(applicantController.getApprovedApplicants)
);
// router.get(
//   "/pending-applicants",
//   tryCatchHandler(applicantController.getPendingApplicants)
// );
router.get(
  "/rejected-applicants",
  tryCatchHandler(applicantController.getRejectedApplicants)
);
router.get(
  "/applicants",
  tryCatchHandler(applicantController.getAllApplicants)
);

// prediction model

router.post("/new-model", modelController.createModelController);
router.get("/get-models", modelController.getAllModels);

//new
router.post(
  "/create-applicant-contact",
  tryCatchHandler(applicantController.createApplicantContactController)
);
router.patch(
  "/create-new-prediction/:applicantId",
  tryCatchHandler(applicantController.createNewPredictionController)
);

module.exports = { applicantRouter: router };
