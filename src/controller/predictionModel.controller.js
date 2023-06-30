const Model = require("../model/predictionModel.model");
const modelValidator = require("../validators/predictionModel.validator");
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
};
module.exports = modelController;
