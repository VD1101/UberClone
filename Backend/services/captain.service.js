const captainModel = require("../models/captin.model.js");

module.exports.createCaptain = async ({
  firstname,
  lastname,
  email,
  password,
  color,
  numberPlate,
  capacity,
  vehicleType,
}) => {
  if (
    !firstname ||
    !email ||
    !password ||
    !color ||
    !numberPlate ||
    !capacity ||
    !vehicleType
  ) {
    throw new Error("All fields are required");
  }
  const captain = captainModel.create({
    fullname: {
      firstname,
      lastname,
    },
    email,
    password,
    vehicle: {
      color,
      numberPlate,
      capacity,
      vehicleType,
    },
  });

  return captain;
};
