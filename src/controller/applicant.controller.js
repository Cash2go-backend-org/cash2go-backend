const {
  applicantSignupValidator,
} = require("../validators/applicant.validator");
const { BadUserRequestError, NotFoundError } = require("../error/error");
const Applicant = require("../model/applicant.model");

const applicantController = {
  applicantSignupController: async (req, res) => {
    const { error } = applicantSignupValidator.validate(req.body);
    if (error) throw error;
    // const { firstName, lastName, email, phoneNumber } = req.body;
    // const emailExists = await Applicant.find({ email: req.body.email });
    // if (emailExists.length > 0)
    //   throw new BadUserRequestError("A user with this email already exists.");

    const newApplicant = await Applicant.create(req.body);
    res.status(201).json({
      message: "A new applicant has been created successfully",
      status: "Success",
      data: {
        applicant: newApplicant,
      },
    });
  },
  searchApplicantController: async (req, res) => {
    const applicant = await Applicant.findOne({
      firstname: req.query.firstname,
    });
    if (!applicant) throw new BadUserRequestError("Applicant not found");
    res.status(200).json({
      message: "Applicant name found successfully",
      status: "Success",
      data: {
        applicant,
      },
    });
  },
  getApplicantDetailsController: async (req, res) => {
    const applicantId = req.params._id;
    const applicant = await Applicant.findOne(applicantId);
    if (!applicant) throw new NotFoundError("Applicant not found");

    res.status(200).json({
      message: "Applicant contact details retrieved successfully",
      status: "Success",
      data: {
        applicant,
      },
    });
  },
  getAllApplicantsController: async (req, res) => {
    const applicants = await Applicant.find();
    res.status(200).json({
      message: "Applicants found successfully",
      data: {
        applicants: applicants,
      },
    });
  },
};

module.exports = applicantController;
