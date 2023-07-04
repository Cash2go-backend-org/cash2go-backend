const express = require("express");
const morgan = require("morgan");
const globalErrorHandler = require("./src/utils/globalErrorHandler");
const mongoose = require("mongoose");
const cors = require("cors");
const { userRouter } = require("./src/router/user.route");
const { applicantRouter } = require("./src/router/applicant.route");
const { messagingRouter } = require("./src/router/messaging.route");
const config = require("./src/config/index");
const checkInternetConnection = require("./src/error/checkInternetConnection");
require("dotenv").config();
// const useragent = require("express-useragent");
// Database connection
const mongoURI = config.MONGODB_CONNECTION_URL;

mongoose
  .connect(mongoURI)
  .then(console.log("Database connection is established"))
  .catch((err) => console.log(err.message));
const port = config.PORT;
const app = express();

// Middleware
// app.use(useragent.express());
app.use(morgan("tiny"));
app.use(express.json());
app.use(cors());

//check internet connectionnnnn
app.use(checkInternetConnection);

// Routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/applicant", applicantRouter);
app.use("/api/v1/messaging", messagingRouter);
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
