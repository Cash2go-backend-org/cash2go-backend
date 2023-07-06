const Model = require("../model/predictionModel.model");
const modelValidator = require("../validators/predictionModel.validator");
const predictionValidator = require("../validators/predictionModel.validator");
const { BadUserRequestError } = require("../error/error");

const modelController = {
  createModelController: async (req, res) => {
    const { error } = modelValidator.validate(req.body);
    if (error) throw error;
    const newModel = await Model.create(req.body);
    if (!newModel) throw new BadUserRequestError("Error creating new model");
    res.status(201).json({
      status: "Success",
      message: "Prediction model created successfully",
      data: {
        model: newModel,
      },
    });
  },
  getAllModels: async (req, res) => {
    const models = await Model.find();
    if (!models) throw new BadUserRequestError("no model found");
    res.status(200).json({
      status: "success",
      message: "Models found successfully",
      data: {
        models: models,
      },
    });
  },
  createNewPredictionController: async (req, res) => {
    const { error } = predictionValidator.validate(req.body);
    if (error) throw error;

    const models = await Model.find();
    if (!models || models.length === 0) {
      throw new BadUserRequestError("No prediction models found");
    }

    const { creditScore, annualIncome, guarantorsCreditScore } = req.body;

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
        // return res.status(200).json({
        return res.json({
          message: "Not eligible for loan",
        });
      }
    }
    res.status(200).json({
      status: "success",
      message: "Eligible for loan",
    });
  },
};
module.exports = modelController;
