const { StatusCodes } = require("http-status-codes")
const { notImplementedResponse } = require("../utils/responseObjects");
const { signupUserService } = require("../services/auth.service");
async function signupController(req, res, next) {
    throw new Error("sample");
    // const response = await signupUserService(req.body);
    // return res.status(StatusCodes.CREATED).json({
    //     data: response,
    //     success: true,
    //     message: "User signed up successfully"
    // });
}

async function signinController(req, res) {
    return notImplementedResponse(res);
}

async function verifyEmailController(req, res) {
    return notImplementedResponse(res);
}

module.exports = {
    signupController,
    signinController,
    verifyEmailController
}