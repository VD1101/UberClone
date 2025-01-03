const express = require("express");
const captainModel = require("../models/captin.model.js");
const captainServices = require("../services/captain.service.js");
const { validationResult } = require("express-validator");
const blackListTokenModel = require("../models/blackListToken.model.js");

module.exports.registerCaptain = async (req, res, next) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty) {
      return res.status(400).json({ error: error.array() });
    }
    const { fullname, vehicle, email, password } = req.body;
    const isCaptainAlready = await captainModel.findOne({ email });
    if (isCaptainAlready) {
      return res.status(401).json({ message: "User as Captin already exist" });
    }
    const hashPassword = await captainModel.hashPassword(password);
    const captain = await captainServices.createCaptain({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email,
      password: hashPassword,
      color: vehicle.color,
      numberPlate: vehicle.numberPlate,
      capacity: vehicle.capacity,
      vehicleType: vehicle.vehicleType,
    });
    const token = captain.generateAuthToken();

    res.status(201).json({ token, captain });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: error.message });
  }
};

module.exports.loginCaptain = async (req, res, next) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty) {
      res.statsu(400).json({ error: error.array() });
    }
    const { email, password } = req.body;

    const captain = await captainModel.findOne({ email }).select("+password");
    if (!captain) {
      return res.status(401).json({ message: "Captain not found" });
    }
    const isMatch = await captain.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password or email" });
    }
    const token = captain.generateAuthToken();
    res.cookie("token", token);
    res.status(200).json({ captain, token });
  } catch (error) {
    console.log("Error : ", error.message);
    res.status(500).json({ message: "login failed" });
  }
};

module.exports.getCaptainProfile = async (req, res, next) => {
  res.status(200).json({ captain: req.captain });
};

module.exports.logoutCaptain = async (req, res, next) => {
  res.clearCookie("token");

  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  await blackListTokenModel.create({ token });

  res.status(200).json({ message: "Logged out" });
};


module.exports.updateStatus = async(req,res,next)=>{
  const captain = req.captain;
  if(captain.status === "active"){
    captain.status = "inactive";
  }
  else{
    captain.status = "active"
  }
  captain.save();

  res.status(200).json({captain});

}