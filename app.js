const express = require("express");
const morgan = require("morgan");
require("dotenv").config();

const port = process.env.PORT;

const app = express();

// Middleware
app.use(express.json());
app.use(morgan.tiny());

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
