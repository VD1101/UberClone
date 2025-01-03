const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const connectToDB = require("./db/db.js");

connectToDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const userRoutes = require("./routes/user.route.js");
const captainRouter = require("./routes/captain.route.js");
const mapRoutes = require("./routes/maps.route.js");
const rideRoutes = require("./routes/ride.route.js");

app.use("/users", userRoutes);
app.use("/captains", captainRouter);
app.use("/maps", mapRoutes);
app.use("/rides", rideRoutes);

module.exports = app;
