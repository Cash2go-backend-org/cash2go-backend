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
};
module.exports = modelController;
