const userModel = require("../models/user.model");
const blackListTokenModel = require("../models/blackListToken.model");

const jwt = require("jsonwebtoken");
const { model } = require("mongoose");
const captainModel = require("../models/captin.model");

module.exports.authUser = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const isBlacklisted = await blackListTokenModel.findOne({ token: token });

  if (isBlacklisted) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded._id);
    if (user) {
      req.user = user;
      return next();
    }
    return res.status(401).json({ message: "Unauthorized" });
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports.authCaptain = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized-1" });
  }
  const isBlacklisted = await blackListTokenModel.findOne({ token: token });
  
  if (isBlacklisted) {
    return res.status(401).json({ message: "Unauthorized-2" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const captain = await captainModel.findById(decoded._id);
    if (captain) {
      req.captain = captain;
      return next();
    }
    return res.status(401).json({ message: "Unauthorized-3" });
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized-4" });
  }
};
