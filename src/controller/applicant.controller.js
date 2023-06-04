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
      return res.status(404).json({ error: "Loan application not found" });
    }

    // Extract the contact details from the loan application document
    const contact = applicant.contact;

    res.status(200).json({ contact });
  },
};

module.exports = applicantController;
