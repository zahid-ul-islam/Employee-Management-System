const mongoose = require("mongoose");

const careerSchema = mongoose.Schema({
  fname: String,
  lname: String,
  email: String,
  age:Number,
  university:String,
  address:String,
  skills:String,
  resumeUrl: String,
  coverLetter: String,
  nationality:String,
  expectedSalary:Number,
  indroduce: String



});

const Applicant = mongoose.model('Applicant', careerSchema);
module.exports = Applicant;
