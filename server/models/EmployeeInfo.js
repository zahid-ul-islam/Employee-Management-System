const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  id: Number,
  firstName: String,
  lastName: String,
  age: Number,
  position: String,
  email: String,
  phone: String,
  address: String,
  department: String,
  joiningDate: Date,
  salary: Number,
  skills: Array,
  education: Array,
});

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
