const { BadUserRequestError } = require("../error/error");
const Applicant = require("../model/applicant.model");
const Model = require("../model/predictionModel.model");
// const ApplicantValidator = require("../validators/applicant.validator");
const {
  contactValidator,
  newPredictionValidator,
} = require("../validators/applicant.validator");

const applicantController = {
  createApplicantContactController: async (req, res) => {
    const { error } = contactValidator.validate(req.body);
    if (error) throw error;

    const {
      firstName,
      lastName,
      gender,
      DOB,
      address,
      stateOfOrigin,
      addressOfEmployer,
      phoneNumber,
      nextOfKinPhoneNumber,
      others,
    } = req.body;

    // Check if applicant with the same phoneNumber already exists
    const existingApplicant = await Applicant.findOne({
      "contact.phoneNumber": phoneNumber,
    });
    if (existingApplicant) {
      return res.status(409).json({
        message: "An applicant with the same phone number already exists",
        status: "Failed",
      });
    }
    const contact = {
      firstName,
      lastName,
      gender,
      DOB,
      address,
      stateOfOrigin,
      addressOfEmployer,
      phoneNumber,
      nextOfKinPhoneNumber,
      others,
    };

    res.status(201).json({
      message: "Applicant contact created successfully",
      status: "Success",
      data: {
        contact,
      },
    });
  },

  createNewPredictionController: async (req, res) => {
    const { error } = newPredictionValidator.validate(req.body);
    if (error) throw error;

    const models = await Model.find();
    if (!models || models.length === 0) {
      throw new BadUserRequestError("No prediction models found");
    }

    const { applicantId, creditScore, annualIncome, guarantorsCreditScore } =
      req.body;

    let eligible = true;
    let applicantContact = null;

    for (const model of models) {
      const {
        creditScore: modelCreditScore,
        annualIncome: modelAnnualIncome,
        guarantorsCreditScore: modelGuarantorsCreditScore,
      } = model;

      if (
        creditScore.value < modelCreditScore.value ||
        annualIncome.value < modelAnnualIncome.value ||
        guarantorsCreditScore.value < modelGuarantorsCreditScore.value
      ) {
        eligible = false;
        break;
      }
    }

    if (eligible) {
      const applicant = await Applicant.findById(applicantId).populate(
        "contact"
      );
      if (!applicant) {
        throw new BadUserRequestError("Applicant not found");
      }
      applicantContact = applicant.contact;
      res.status(200).json({
        status: "success",
        message: "Eligible for loan",
        data: {
          applicantContact,
        },
      });
    } else {
      res.json({
        message: "Not eligible for loan",
      });
    }
  },

  // createNewPredictionController: async (req, res) => {
  //   const { error } = newPredictionValidator.validate(req.body);
  //   if (error) throw error;

  //   const models = await Model.find();
  //   if (!models || models.length === 0) {
  //     throw new BadUserRequestError("No prediction models found");
  //   }

  //   const { creditScore, annualIncome, guarantorsCreditScore } = req.body;

  //   let eligible = true;

  //   for (const model of models) {
  //     const {
  //       creditScore: modelCreditScore,
  //       annualIncome: modelAnnualIncome,
  //       guarantorsCreditScore: modelGuarantorsCreditScore,
  //     } = model;

  //     if (
  //       creditScore.value < modelCreditScore.value ||
  //       annualIncome.value < modelAnnualIncome.value ||
  //       guarantorsCreditScore.value < modelGuarantorsCreditScore.value
  //     ) {
  //       eligible = false;
  //       break;
  //     }
  //   }

  //   if (eligible) {
  //     res.status(200).json({
  //       status: "success",
  //       message: "Eligible for loan",
  //     });
  //   } else {
  //     res.json({
  //       message: "Not eligible for loan",
  //     });
  //   }
  // },

  getApplicantDetailsController: async (req, res) => {
    // Retrieve the applicant details from the database or perform necessary actions

    const applicant = {
      contact: {
        firstName: "John",
        lastName: "Doe",
        // Other contact properties
      },
      prediction: {
        modelName: "Prediction Model 1",
        modelDescription: "This is a prediction model",
        // Other prediction properties
      },
    };

    res.status(200).json({
      message: "Applicant details retrieved successfully",
      status: "Success",
      data: {
        applicant,
      },
    });
  },

  // createApplicantController: async (req, res) => {
  //   const { error } = ApplicantValidator.validate(req.body);
  //   if (error) throw error;
  //   const applicant = await Applicant.create(req.body);
  //   res.status(201).json({
  //     message: "Loan applicant created successfully",
  //     status: "Success",
  //     data: {
  //       applicant: applicant,
  //     },
  //   });
  // },
  getApplicantContact: async (req, res) => {
    const applicantId = req.params.id; // Assuming the loan application ID is passed as a parameter

    // Retrieve the loan application document with the specified ID
    const applicant = await Applicant.findById(applicantId).populate("contact");

    if (!applicant) {
      return res.status(404).json({ error: "Loan applicant not found" });
    }

    // Extract the contact details from the loan application document
    const contact = applicant.contact;

    res.status(200).json({ "contact info": contact });
  },
  getApplicantPrediction: async (req, res) => {
    const applicantId = req.params.id; // Assuming the loan application ID is passed as a parameter

    // Retrieve the loan application document with the specified ID
    const applicant = await Applicant.findById(applicantId).populate(
      "prediction"
    ); // Populate the 'contact' field to fetch the associated prediction details

    if (!applicant) {
      return res.status(404).json({ error: "applicant not found" });
    }

    // Extract the prediction details from the application document
    const prediction = applicant.prediction;

    res.status(200).json({ "prediction info": prediction });
  },

  getApprovedApplicants: async (req, res) => {
    const approvedApplicants = await Applicant.find({
      "prediction.isApproved": true,
    }).populate("prediction");

    if (approvedApplicants.length === 0)
      throw new BadUserRequestError("No approved applicants found");

    const contactInfo = approvedApplicants.contact;
    const predictionInfo = approvedApplicants.prediction;

    res.status(200).json({
      message: "Approved applicants details retrieved successfully",
      status: "Success",
      data: {
        approvedApplicants: {
          contact: contactInfo,
          prediction: predictionInfo,
          approvedApplicants,
        },
      },
    });
  },
  getPendingApplicants: async (req, res) => {
    const pendingApplicants = await Applicant.find({
      "prediction.isPending": true,
    }).populate("prediction");

    if (pendingApplicants.length === 0)
      throw new BadUserRequestError("No pending applicants found");

    res.status(200).json({
      message: "Pending applicants retrieved successfully",
      status: "Success",
      data: {
        pendingApplicants,
      },
    });
  },
  getRejectedApplicants: async (req, res) => {
    const rejectedApplicants = await Applicant.find({
      "prediction.isRejected": true,
    }).populate("prediction");

    if (!rejectedApplicants)
      throw new BadUserRequestError("No rejected applicants found");

    res.status(200).json({
      message: "Rejected applicants retrieved successfully",
      status: "Success",
      data: {
        rejectedApplicants,
      },
    });
  },
  getAllApplicants: async (req, res) => {
    const allApplicants = await Applicant.find();
    if (!allApplicants) throw new BadUserRequestError("No applicant found");
    res.status(200).json({
      message: "Applicants found",
      status: "Success",
      data: {
        Applicants: allApplicants,
      },
    });
  },
};

module.exports = applicantController;
