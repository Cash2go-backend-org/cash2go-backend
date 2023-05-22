function globalErrorHandler(err, req, res, next) {
  console.log(err.name);
  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: err.message,
      status: "Failed",
      errorType: "ValidationError",
    });
  }

  return res.status(err.status || 404).json({
    message: err.message,
    status: "Failed",
  });

}

module.exports = globalErrorHandler;
