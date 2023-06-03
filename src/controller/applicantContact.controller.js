const {
  applicantSignupValidator,
} = require("../validators/applicantContact.validator");
const { BadUserRequestError, NotFoundError } = require("../error/error");
const Contact = require("../model/applicantContact.model");

const contactController = {
  applicantSignupController: async (req, res) => {
    const { error } = applicantSignupValidator.validate(req.body);
    if (error) throw error;

    const newApplicantContact = await Contact.create(req.body);
    res.status(201).json({
      message: "A new applicant has been created successfully",
      status: "Success",
      data: {
        applicantContact: newApplicantContact,
      },
    });
  },
  searchApplicantController: async (req, res) => {
    const contact = await Contact.findOne({
      firstname: req.query.firstname,
    });
    if (!applicant) throw new BadUserRequestError("Contact not found");
    res.status(200).json({
      message: "Contact name found successfully",
      status: "Success",
      data: {
        contact,
      },
    });
  },
  getApplicantContactDetailsController: async (req, res) => {
    const contactId = req.params._id;
    const contact = await Contact.findOne(contactId);
    if (!contact) throw new NotFoundError("Contact not found");

    res.status(200).json({
      message: "Applicant contact details retrieved successfully",
      status: "Success",
      data: {
        contact,
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

module.exports = contactController;
