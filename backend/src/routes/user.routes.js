const express = require("express");
const { getUserDetails } = require("../controllers/user.controller");
const { validateParams } = require("../middlewares/validate");
const { getUserDetailsValidator } = require("../validators/user.validator");

const userRouter = express.Router(); // Create a new router

userRouter.get(
    "/:userId", 
    validateParams(getUserDetailsValidator),
    getUserDetails
);

module.exports = userRouter; // Export the router