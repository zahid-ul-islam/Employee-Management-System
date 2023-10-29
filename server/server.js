require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
app.use(bodyParser.json());
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
connectDB()
app.use('/users', require('./routes/api/user'));
app.use('/employee', require('./routes/api/employeeActions'));