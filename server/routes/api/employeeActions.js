const express = require("express");
const router = express.Router();
const Employee = require("../../models/EmployeeInfo");
const authentication = require('../../middleware/authentication')

router.post("/in", authentication, async (req, res) => {
  try {
    const empObj = {
        id: req.body.id,
        firstName:req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        position: req.body.position,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        department: req.body.department,
        joiningDate: req.body.joiningDate,
        salary: req.body.salary,
        skills: req.body.skills,
        education: req.body.education ,
    }
    const user = new Employee(empObj);
    await user.save();
    res.status(201).json({user});
  } catch (err) {
    catchFunction();
  }
});
router.get("/getspecificempinfo", authentication,async (req, res) => {
  try {
    const employees = await Employee.find().select('firstName lastName age position');
    res.status(200).json(employees);
  } catch (err) {
    catchFunction();
  }
});
router.get("/getallempinfo", authentication , async (req, res) => {
    try {
      const employees = await Employee.find();
      res.status(200).json(employees);
    } catch (err) {
      catchFunction();
    }
  });

  router.put("/update/:id", authentication, async (req, res) => {
    try {
      const id = req.params.id;
      const body = req.body;
      const user = await Employee.findByIdAndUpdate(id, body, { new: true });
  
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: "user not found" });
      }
    } catch (error) {
      catchFunction(error, res);
    }
  });

  router.delete("/delete/:id", authentication, async (req, res) => {
    try {
      const id = req.params.id;
      const user = await Employee.findByIdAndDelete(id);

      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: "user not found" });
      }
    } catch (error) {
      catchFunction(error, res);
    }
  });


module.exports = router;

//function
function catchFunction(error, res) {
  console.error(error);
  res.status(500).json({ message: "something went wrong" });
}
