const { StatusCodes } = require("http-status-codes")
const { notImplementedResponse } = require("../utils/responseObjects");
const { signupUserService, signinUserService } = require("../services/auth.service");
const NotImplemented = require("../utils/errors/notImplementedError");
async function signupController(req, res) {
    // !. Call the service function
    const response = await signupUserService(req.body);

    // 2. Send the response
    return res.status(StatusCodes.CREATED).json({
        data: response,
        success: true,
        message: "User signed up successfully"
    });
}

async function signinController(req, res) {
    // 1. Call the service function
    const response = await signinUserService(req.body);

    return res.status(StatusCodes.OK).json({
        data: response,
        sucess: true,
        message: "User signed in successfully"
    })
}

async function verifyEmailController(req, res) {
    throw new NotImplemented();
}

module.exports = {
    signupController,
    signinController,
    verifyEmailController
}