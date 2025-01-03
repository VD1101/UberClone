const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const userController = require("../controllers/user.controller.js");
const authMiddleware = require("../middlewares/auth.middleware.js");

router.post(
  "/register",
  [
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("first name must be at least 3 characters long"),
    body("email").isEmail().withMessage("Invalid email eddress"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 charaters long"),
  ],
  userController.registerUser
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email eddress"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 charaters long"),
  ],
  userController.loginUser
);

router.get(
  "/profile",
  authMiddleware.authUser,
  userController.getUserProfile
);

router.get(
  "/logout",
  authMiddleware.authUser,
  userController.logoutUser
);

module.exports = router;