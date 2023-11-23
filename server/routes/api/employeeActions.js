const express = require("express");
const router = express.Router();
const Employee = require("../../models/EmployeeInfo");
const authentication = require('../../middleware/authentication')

router.post("/in", authentication, async (req, res) => {
  try {
    const name = req.body.firstName+' '+req.body.lastName
    const empObj = {
        id: req.body.id,
        fullName:name,
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
    const employees = await Employee.find().select('fullName age position');
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
      req.body.fullName = req.body.firstName+' '+req.body.lastName
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

  router.get('/positionsearch', authentication,async(req,res)=>{
    try {
      const pos = req.body.position
      const user = await Employee.find({position:pos}).select('fullName age position')
      if(!user){
        res.json({message: 'employee not found'})
      }else{
        res.json(user)
      }
    } catch (error) {
      catchFunction(error, res)
    }
  })

  router.get('/namesearch', authentication, async(req,res)=>{
    try {
      const name = req.body.name
      const user = await Employee.find({firstName:name}).select('fullName age position')
      if(!user){
        res.json({message: 'employee not found'})
      }else{
        res.json(user)
      }
    } catch (error) {
      catchFunction(error, res)
    }
  })

  router.get('/deptsearch', authentication ,async(req,res)=>{
    try {
      const dept = req.body.department
      const user = await Employee.find({department:dept}).select('fullName age position')
      if(!user){
        res.json({message: 'employee not found'})
      }else{
        res.json(user)
      }
    } catch (error) {
      catchFunction(error, res)
    }
  })

  router.get('/numberofemployee', authentication, async (req,res)=>{
    try {
      const totalEmployee = await Employee.countDocuments()
      res.status(200).json({totalEmployee})
    } catch (error) {
      catchFunction(error, res)
    }
  })

  router.get('/average-age',authentication, async (req, res) => {
    try {
        const employees = await Employee.find({});
        
        if (employees.length === 0) {
            return res.json({ averageAge: 0 });
        }

        const totalAge = employees.reduce((total, employee) => total + employee.age, 0);
        const averageAge = totalAge / employees.length;

        res.json({ averageAge });
    } catch (error) {
        catchFunction(error,res)
    }
});




module.exports = router;

//function
function catchFunction(error, res) {
  console.error(error);
  res.status(500).json({ message: "something went wrong" });
}
