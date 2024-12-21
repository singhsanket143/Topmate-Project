const { StatusCodes } = require("http-status-codes")
const { notImplementedResponse } = require("../utils/responseObjects")
async function signupController(req, res) {
    console.log("Signup controller");
    return notImplementedResponse(res);
}

async function signinController(req, res) {
    return notImplementedResponse(res);
}

module.exports = {
    signupController,
    signinController
}