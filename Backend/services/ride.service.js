const { send } = require("process");
const rideModel = require("../models/ride.model.js");
const mapServices = require("../services/maps.service.js");
const crypto = require("crypto");

const getFare = async (pickup, destination) => {
  if (!pickup || !destination) {
    throw new Error("Pickup and destination are required");
  }

  // Fetch distance and time from a mapping service
  const distanceTime = await mapServices.getDistanceTime(pickup, destination);

  // Fare details (CAD)
  const fareDetails = {
    car: {
      baseFare: 3.5, // Starting fee
      perKmRate: 1.5, // Cost per kilometer
      perMinuteRate: 0.3, // Cost per minute
      bookingFee: 1.75, // Flat booking fee
    },
    moto: {
      baseFare: 2.5,
      perKmRate: 1.0,
      perMinuteRate: 0.25,
      bookingFee: 1.5,
    },
    auto: {
      baseFare: 2.0,
      perKmRate: 0.8,
      perMinuteRate: 0.2,
      bookingFee: 1.0,
    },
  };

  const distanceInKm = distanceTime.distance.value / 1000; // Convert meters to kilometers
  const durationInMinutes = distanceTime.duration.value / 60; // Convert seconds to minutes

  // Calculate fares for all vehicle types
  const fare = Object.keys(fareDetails).reduce((result, vehicleType) => {
    const { baseFare, perKmRate, perMinuteRate, bookingFee } =
      fareDetails[vehicleType];
    const fare =
      baseFare +
      distanceInKm * perKmRate +
      durationInMinutes * perMinuteRate +
      bookingFee;
    result[vehicleType] = Math.round(fare * 100) / 100; // Round to 2 decimal places
    return result;
  }, {});

  return fare;
};

module.exports.getFare = getFare;

function getOtp(num) {
  function generateOtp(num) {
    const otp = crypto
      .randomInt(Math.pow(10, num - 1), Math.pow(10, num))
      .toString();
    return otp;
  }
  return generateOtp(num);
}

// async function getFare(pickup, destination) {
//   if (!pickup || !destination) {
//     throw new Error("Pickup and destination are required");
//   }
//   const distanceTime = await mapServices.getDistanceTime(pickup, destination);

//   // Adjusted base fares in USD/CAD
//   const baseFare = {
//     auto: 2.5, // Small or budget vehicles (if applicable)
//     car: 5, // Standard car
//     moto: 2, // Motorcycle or scooter
//   };

//   // Adjusted per kilometer rates in USD/CAD
//   const perKmRate = {
//     auto: 0.75,
//     car: 1.25,
//     moto: 0.5,
//   };

//   // Adjusted per minute rates in USD/CAD
//   const perMinuteRate = {
//     auto: 0.2,
//     car: 0.3,
//     moto: 0.15,
//   };

//   const fare = {
//     auto: Math.round(
//       baseFare.auto +
//         (distanceTime.distance.value / 1000) * perKmRate.auto +
//         (distanceTime.duration.value / 60) * perMinuteRate.auto
//     ),
//     car: Math.round(
//       baseFare.car +
//         (distanceTime.distance.value / 1000) * perKmRate.car +
//         (distanceTime.duration.value / 60) * perMinuteRate.car
//     ),
//     moto: Math.round(
//       baseFare.moto +
//         (distanceTime.distance.value / 1000) * perKmRate.moto +
//         (distanceTime.duration.value / 60) * perMinuteRate.moto
//     ),
//   };

//   return fare;
// }

const getDistanceTime = async (pickup, destination) => {
  if (!pickup || !destination) {
    throw new Error("Pickup and destination are required");
  }

  const distanceTime = await mapServices.getDistanceTime(pickup, destination);

  return distanceTime;
};

module.exports.createRide = async ({
  user,
  pickup,
  destination,
  vehicleType,
}) => {
  if (!user || !pickup || !destination || !vehicleType) {
    throw new Error("All fields are required");
  }

  const fare = await getFare(pickup, destination);

  const distanceTime = await getDistanceTime(pickup, destination);

  const ride = rideModel.create({
    user,
    pickup,
    destination,
    otp: getOtp(6),
    fare: fare[vehicleType],
    distance: distanceTime.distance.value,
    duration: distanceTime.duration.value,
  });

  return ride;
};

module.exports.confirmRide = async ({ rideId, captainId }) => {
  if (!rideId) {
    throw new Error("Ride id is required");
  }
  await rideModel.findOneAndUpdate(
    {
      _id: rideId,
    },
    {
      status: "accepted",
      captain: captainId,
    }
  );

  const ride = await rideModel
    .findOne({
      _id: rideId,
    })
    .populate("user")
    .populate("captain")
    .select("+otp");

  if (!ride) {
    throw new Error("Ride not found");
  }
  return ride;
};

module.exports.startRide = async ({ rideId, otp }) => {
  if (!rideId || !otp) {
    throw new Error("Ride id and OTP are required");
  }

  const ride = await rideModel
    .findOne({
      _id: rideId,
    })
    .populate("user")
    .populate("captain")
    .select("+otp");

  if (!ride) {
    throw new Error("Ride not found");
  }

  if (ride.status !== "accepted") {
    throw new Error("Ride not accepted");
  }

  if (ride.otp !== otp) {
    throw new Error("Invalid OTP");
  }

  await rideModel.findOneAndUpdate(
    {
      _id: rideId,
    },
    {
      status: "ongoing",
    }
  );

  return ride;
};

module.exports.endRide = async ({ rideId, captainId }) => {
  if (!rideId) {
    throw new Error("Ride id is required");
  }

  const ride = await rideModel
    .findOne({
      _id: rideId,
      captain : captainId
    })
    .populate("user")
    .populate("captain")
    .select("+otp");

  if (!ride) {
    throw new Error("Ride not found");
  }

  if (ride.status !== "ongoing") {
    throw new Error("Ride not ongoing");
  }

  await rideModel.findOneAndUpdate(
    {
      _id: rideId,
    },
    {
      status: "completed",
    }
  );

  return ride;
};
