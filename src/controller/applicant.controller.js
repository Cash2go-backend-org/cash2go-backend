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

    const contact = ({
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
    } = req.body);

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

    const newApplicant = new Applicant({
      contact,
    });

    // Save the new applicant to the database
    await newApplicant.save();

    res.status(201).json({
      message: "Applicant contact created successfully",
      status: "Success",
      data: {
        id: newApplicant._id,
        contact,
      },
    });
  },

  createNewPredictionController: async (req, res) => {
    const { error } = newPredictionValidator.validate(req.body);
    if (error) throw error;

    const model = await Model.findOne({ isSelected: true });
    if (!model || model.length === 0) {
      throw new BadUserRequestError("No prediction models found");
    }
    // const models = await Model.find();
    // if (!models || models.length === 0) {
    //   throw new BadUserRequestError("No prediction models found");
    // }

    const { applicantId } = req.params;
    const {
      creditScore,
      annualIncome,
      guarantorsCreditScore,
      creditUtilization,
      loanDuration,
      previousLoanPerfomance,
      lastLoanApplication,
    } = req.body;

    let eligible = true;

     const {
       creditScore: modelCreditScore,
       annualIncome: modelAnnualIncome,
       guarantorsCreditScore: modelGuarantorsCreditScore,
    } = model;
    
     if (
        creditScore < modelCreditScore.value ||
        annualIncome < modelAnnualIncome.value ||
        guarantorsCreditScore < modelGuarantorsCreditScore.value
      ) {
        eligible = false;
      }


    // for (const model of models) {
    //   const {
    //     creditScore: modelCreditScore,
    //     annualIncome: modelAnnualIncome,
    //     guarantorsCreditScore: modelGuarantorsCreditScore,
    //   } = model;

    //   if (
    //     creditScore.value < modelCreditScore.value ||
    //     annualIncome.value < modelAnnualIncome.value ||
    //     guarantorsCreditScore.value < modelGuarantorsCreditScore.value
    //   ) {
    //     eligible = false;
    //     break;
    //   }
    // }

    try {
      const applicant = await Applicant.findById(applicantId);
      if (!applicant) {
        throw new BadUserRequestError("Applicant not found");
      }

      let loanStatus;

      if (eligible) {
        applicant.prediction.isApproved = true;
        applicant.prediction.isRejected = false;
        applicant.prediction.creditScore = creditScore;
        applicant.prediction.annualIncome = annualIncome;
        applicant.prediction.guarantorsCreditScore = guarantorsCreditScore;
        applicant.prediction.creditUtilization = creditUtilization;
        applicant.prediction.loanDuration = loanDuration;
        applicant.prediction.previousLoanPerfomance = previousLoanPerfomance;
        applicant.prediction.lastLoanApplication = lastLoanApplication;
        await applicant.save();
        loanStatus = "Approved";
      } else {
        applicant.prediction.isApproved = false;
        applicant.prediction.isRejected = true;
        applicant.prediction.creditScore = creditScore;
        applicant.prediction.annualIncome = annualIncome;
        applicant.prediction.guarantorsCreditScore = guarantorsCreditScore;
        applicant.prediction.creditUtilization = creditUtilization;
        applicant.prediction.loanDuration = loanDuration;
        applicant.prediction.previousLoanPerfomance = previousLoanPerfomance;
        applicant.prediction.lastLoanApplication = lastLoanApplication;
        await applicant.save();
        loanStatus = "Rejected";
      }

      res.status(200).json({
        status: "success",
        message: "Loan prediction completed",
        data: {
          // applicantId,
          loanStatus,
          applicant,
        },
      });
    } catch (error) {
      throw error;
    }
  },

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

  getApprovedApplicants: async (req, res) => {
    const approvedApplicants = await Applicant.find({
      "prediction.isApproved": true,
    }).populate("contact");

    if (approvedApplicants.length === 0) {
      throw new BadUserRequestError("No approved applicants found");
    }

    res.status(200).json({
      message: "Approved applicants details retrieved successfully",
      status: "Success",
      data: {
        approvedApplicants,
      },
    });
  },

  getRejectedApplicants: async (req, res) => {
    const rejectedApplicants = await Applicant.find({
      "prediction.isRejected": true,
    }).populate("contact");

    if (rejectedApplicants.length === 0) {
      throw new BadUserRequestError("No rejected applicants found");
    }

    res.status(200).json({
      message: "Rejected applicants retrieved successfully",
      status: "Success",
      data: {
        rejectedApplicants,
      },
    });
  },

  getAllApplicants: async (req, res) => {
    try {
      const allApplicants = await Applicant.find();
      // .populate("contact")
      // .populate("prediction");

      if (!allApplicants || allApplicants.length === 0) {
        throw new BadUserRequestError("No applicants found");
      }

      // const applicantsData = allApplicants.map((applicant) => {
      //   const {
      //     _id,
      //     contact: {
      //       firstName,
      //       lastName,
      //       gender,
      //       DOB,
      //       address,
      //       stateOfOrigin,
      //       addressOfEmployer,
      //       phoneNumber,
      //       nextOfKinPhoneNumber,
      //     } = {},
      //     prediction: { isApproved, isRejected } = {},
      //     applicationDate,
      //     applicationID,
      //   } = applicant;

      //   const loanStatus = isApproved
      //     ? "Approved"
      //     : isRejected
      //     ? "Rejected"
      //     : "Pending";

      //   return {
      //     _id,
      //     contact: {
      //       firstName,
      //       lastName,
      //       gender,
      //       DOB,
      //       address,
      //       stateOfOrigin,
      //       addressOfEmployer,
      //       phoneNumber,
      //       nextOfKinPhoneNumber,
      //     },
      //     loanStatus,
      //     applicationDate,
      //     applicationID,
      //   };
      // });

      res.status(200).json({
        message: "Applicants found",
        status: "Success",
        data: {
          Applicants: allApplicants,
        },
      });
    } catch (error) {
      throw error;
    }
  },
};

module.exports = applicantController;
