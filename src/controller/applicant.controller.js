const {
  applicantSignupValidator,
} = require("../validators/applicant.validator");
const { BadUserRequestError, NotFoundError } = require("../error/error");
// require("dotenv").config();
const Applicant = require("../model/applicant.model");

const applicantController = {
  applicantSignupController: async (req, res) => {
    const { error } = applicantSignupValidator.validate(req.body);
    if (error) throw error;
    const { firstName, lastName, email, phoneNumber } = req.body;
    const emailExists = await Applicant.find({ email: req.body.email });
    if (emailExists.length > 0)
      throw new BadUserRequestError("A user with this email already exists.");

    // const { firstName, lastName, email, phoneNumber } = req.body;

    const newApplicant = await User.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      phoneNumber: phoneNumber,
    });
    res.status(201).json({
      message: "A new applicant has been created successfully",
      status: "Success",
      data: {
        applicant: newApplicant,
      },
    });
  },

  searchApplicantController: async (req, res) => {
    const applicant = await User.findOne({ firstname: req.query?.firstname });
    if (!applicant) throw new NotFoundError("Applicant not found");

    res.status(200).json({
      message: "Applicant name found successfully",
      status: "Success",
      data: {
        applicant,
      },
    });
  },
};

module.exports = applicantController;
