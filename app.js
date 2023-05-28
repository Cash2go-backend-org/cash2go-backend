const express = require("express");
const morgan = require("morgan");
const globalErrorHandler = require("./src/utils/globalErrorHandler");
const mongoose = require("mongoose");
const cors = require("cors");
const { userRouter } = require("./src/router/user.route");
const config = require("./src/config/index");
require("dotenv").config();

// Database connection
const mongoURI = config.MONGODB_CONNECTION_URL;

mongoose
  .connect(mongoURI)
  .then(console.log("Database connection is established"))
  .catch((err) => console.log(err.message));
const port = config.PORT;
const app = express();

// Middleware
app.use(morgan("tiny"));
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/v1/user", userRouter);
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// error handler
app.use(globalErrorHandler);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
