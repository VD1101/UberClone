const rideServices = require("../services/ride.service.js");
const mapServices = require("../services/maps.service.js");
const { validationResult } = require("express-validator");
const { sendMessageToSocketId } = require("../socket.js");
const rideModel = require("../models/ride.model.js");

module.exports.createRide = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }
  const { pickup, destination, vehicleType } = req.body;

  try {
    const ride = await rideServices.createRide({
      user: req.user._id,
      pickup,
      destination,
      vehicleType,
    });
    res.status(201).json(ride);

    const pickupCoordinates = await mapServices.getAddressCoordinate(pickup);

    const captainsInRadius = await mapServices.getCaptainsInTheRadius(
      pickupCoordinates.ltd,
      pickupCoordinates.lng,
      2
    );
    
    ride.otp = "";

    const rideWithUser = await rideModel
      .findOne({ _id: ride._id })
      .populate("user");

    captainsInRadius.map((captain) => {
      sendMessageToSocketId(captain.socketId, {
        event: "new-ride",
        data: rideWithUser,
      });
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

module.exports.getFare = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }
  const { pickup, destination } = req.query;
  try {
    const fare = await rideServices.getFare(pickup, destination);
    return res.status(200).json(fare);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports.confirmRide = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }

  const {rideId} = req.body;
  console.log(req.captain.status)
  try {
    const ride = await rideServices.confirmRide({
      rideId,
      captainId : req.captain._id,
    });
    sendMessageToSocketId(ride.user.socketId, {
      event: "ride-confirmed",
      data: ride,
    });


    return res.status(200).json(ride);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};


module.exports.startRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
  }

  const { rideId, otp } = req.query;

  try {
      const ride = await rideServices.startRide({ rideId, otp });

      console.log(ride);

      sendMessageToSocketId(ride.user.socketId, {
          event: 'ride-started',
          data: ride
      })

      return res.status(200).json(ride);
  } catch (err) {
      return res.status(500).json({ message: err.message });
  }
}

module.exports.endRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
  }

  const { rideId } = req.body;

  try {
      const ride = await rideServices.endRide({ rideId, captainId:req.captain._id });

      sendMessageToSocketId(ride.user.socketId, {
          event: 'ride-ended',
          data: ride
      })



      return res.status(200).json(ride);
  } catch (err) {
      return res.status(500).json({ message: err.message });
  } s
}