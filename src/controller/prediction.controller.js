const { predictionValidator } = require("../validators/prediction.validator");
const { BadUserRequestError, NotFoundError } = require("../error/error");
const Applicant = require("../model/applicantContact.model");
const Prediction = require("../model/prediction.model");

const predictionController = {
  createPrediction: async (req, res) => {
    const { error } = predictionValidator.validate(req.body);
    if (error) throw error;

    const {
      loanRequestAmount,
      creditScore,
      creditUtilization,
      annualIncome,
      loanDuration,
      previousLoanPerfomance,
      lastLoanApplication,
      guarantorsCreditScore,
      isApproved,
      isPending,
      isRejected,
    } = req.body;


    // const existingPrediction = await Prediction.findOne({
    //   loanRequestAmount,
    //   creditScore,
    //   author: applicant._id,
    // });

    // if (existingPrediction) {
    //   return res.status(409).json({
    //     message: "Prediction already exists",
    //   });
    // }

    const newPrediction = await Prediction.create({
      loanRequestAmount,
      creditScore,
      creditUtilization,
      annualIncome,
      loanDuration,
      previousLoanPerfomance,
      lastLoanApplication,
      guarantorsCreditScore,
      isApproved: isApproved || false,
      isPending: isPending || false,
      isRejected: isRejected || false,
    });

    res.status(201).json({
      message: "Prediction created successfully",
      status: "Success",
      data: {
        ...newPrediction.toObject(),
        isApproved: isApproved || false,
        isPending: isPending || false,
        isRejected: isRejected || false,
      },
    });
  },
};

module.exports = predictionController;
