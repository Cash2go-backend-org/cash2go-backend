const fetch = require("node-fetch");

const checkInternetConnection = async (req, res, next) => {
  try {
    const response = await fetch("https://www.google.com", { method: "HEAD" });
    if (!response.ok) {
      throw new Error(
        "No internet connection. Please check your network settings."
      );
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "An error occurred while checking internet connection.",
    });
  }
};

module.exports = checkInternetConnection;
