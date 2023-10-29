const express = require("express");
const {body, validationResult} = require('express-validator') 
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const authentication = require('../../middleware/authentication')

router.post("/registration",
[
  body('first_Name','first_Name is required').notEmpty(),
  body('last_Name','last_Name is required').notEmpty(),
  body('email','please enter a valid email').notEmpty().isEmail(),
  body('password','please enter a valid password with 4 or more characters').isLength({min: 6}),

],
 async (req, res) => {
  try {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
      return res.status(400).json({errors: errors})
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);
    const password = hash;
    const userObj = {
      first_Name: req.body.first_Name,
      last_Name: req.body.last_Name,
      email: req.body.email,
      password: password,
      
    };
    const user = new User(userObj);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    catchFunction(error, res);
  }
});
router.post("/login", 
[
  body('type','type is required').notEmpty(),
  body('type','type must be email or refresh').isIn(['email','refresh '] )
], 
 async (req, res) => {
  try {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
      return res.status(400).json({errors: errors})
    }
        const { email, password, type, refreshToken } = req.body;
        
        if (type == "email") {
            await handleEmailLogin(email, res, password);
        } else {
            handleRefreshLogin(refreshToken, res); 
        }
  
  } catch (error) {
    catchFunction(error, res);
  }
});

module.exports = router
//fuction
function catchFunction(error, res) {
    console.error(error);
    res.status(500).json({ message: "something went wrong" });
  }
  function handleRefreshLogin(refreshToken, res) {
    if (!refreshToken) {
      res.status(401).json({ message: "refresh token not defined" });
    } else {
      jwt.verify(refreshToken, process.env.JWT_SECRET, async (err, payload) => {
        if (err) {
          res.status(401).json({ message: "refresh token not matched" });
        } else {
          const id = payload.id;
          const user = await User.findById(id);
          if (!user) {
            res.status(401).json({ message: "unauthorized" });
          } else {
            getUserTokens(user, res);
          }
        }
      });
    }
  }
  async function handleEmailLogin(email, res, password) {
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(404).json({ message: "user not found" });
    } else {
      const isValidPass = await bcrypt.compare(password, user.password);
      if (!isValidPass) {
        res.status(401).json({ message: "Wrong password" });
      } else {
        getUserTokens(user, res);
      }
    }
  }
  function getUserTokens(user, res) {
    const accessToken = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "2d" }
    );
    const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    const userObj = user.toJSON();
    userObj["accessToken"] = accessToken;
    userObj["refreshToken"] = refreshToken;
  
    res.status(200).json(userObj);
  }
  
  

