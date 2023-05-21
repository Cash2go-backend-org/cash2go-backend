const express = require("express");
const morgan = require("morgan");
const globalErrorHandler = require("./src/utils/globalErrorHandler");
const mongoose = require("mongoose");
const { userRouter } = require("./src/router/user.route");
require("dotenv").config();

// Database connection
const mongoURI = process.env.MONGODB_CONNECTION_URL;

mongoose
  .connect(mongoURI)
  .then(console.log("Database connection is established"))
  .catch((err) => console.log(err.message));
const port = process.env.PORT;
const app = express();

// Middleware
app.use(morgan("tiny"));
app.use(express.json());



// Routes
app.use("/api/v1/user", userRouter);



// error handler
app.use(globalErrorHandler);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
