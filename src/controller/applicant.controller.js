const Applicant = require("../model/applicant.model");
const ApplicantValidator = require("../validators/applicant.validator");
const applicantController = {
  createApplicantController: async (req, res) => {
    const { error } = ApplicantValidator.validate(req.body);
    if (error) throw error;

    const newApplicant = await Applicant.create(req.body);
    res.status(201).json({
      message: "A new applicant has been created successfully",
      status: "Success",
      data: {
        applicant: newApplicant,
      },
    });
  },
  getApplicantContact: async (req, res) => {
    const applicantId = req.params.id; // Assuming the loan application ID is passed as a parameter

    // Retrieve the loan application document with the specified ID
    const applicant = await Applicant.findById(applicantId).populate("contact"); // Populate the 'contact' field to fetch the associated contact details

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
      isApproved: true,
    }).populate("prediction");

    if (!approvedApplicants) {
      return res.status(404).json({
        message: "No approved applicants found",
        status: "Error",
      });
    }

    res.status(200).json({
      message: "Approved applicants retrieved successfully",
      status: "Success",
      data: {
        approvedApplicants,
      },
    });
  },
  getPendingApplicants: async (req, res) => {
    const pendingApplicants = await Applicant.find({ isPending: true });

    if (!pendingApplicants) {
      return res.status(404).json({
        message: "No pending applicants found",
        status: "Failed",
      });
    }

    res.status(200).json({
      message: "Pending applicants retrieved successfully",
      status: "Success",
      data: {
        pendingApplicants,
      },
    });
  },
  getRejectedApplicants: async (req, res) => {
    const rejectedApplicants = await Applicant.find({ isRejected: true });

    if (rejectedApplicants) {
      return res.status(404).json({
        message: "No rejected applicants found",
        status: "Failed",
      });
    }

    res.status(200).json({
      message: "Rejected applicants retrieved successfully",
      status: "Success",
      data: {
        rejectedApplicants,
      },
    });
  },
};

module.exports = applicantController;
