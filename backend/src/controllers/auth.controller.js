const { StatusCodes } = require("http-status-codes")
const { notImplementedResponse } = require("../utils/responseObjects");
const { signupUserService, signinUserService, changeUserRoleService } = require("../services/auth.service");
const NotImplemented = require("../utils/errors/notImplementedError");

/**
 * Controller to signup a user.
 *
 * @async
 * @function signupController
 * @param {Object} req - Express request object.
 * @param {Object} req.body - The body of the request.
 * @param {Object} res - Express response object.
 * @returns {Promise<Object>} The response object with a success message and the new created user data.
 */
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

/**
 * Controller to sign in a user.
 *
 * @async
 * @function signinController
 * @param {Object} req - Express request object.
 * @param {Object} req.body - The body of the request.
 * @param {Object} res - Express response object.
 * @returns {Promise<Object>} The response object with a success message and the new created token.
 */
async function signinController(req, res) {
    // 1. Call the service function
    const response = await signinUserService(req.body);

    // 2. Set HTTP Only cookie in response
    res.cookie("refreshToken", response.refreshToken, {
        httpOnly: true,
        sameSite: 'None',
        secure: false,
        maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
    });

    // 3. Send the response
    return res.status(StatusCodes.OK).json({
        data: response.accessToken,
        sucess: true,
        message: "User signed in successfully"
    });
}

/**
 * Controller to change the role of a user.
 *
 * @async
 * @function changeUserRoleController
 * @param {Object} req - Express request object.
 * @param {Object} req.body - The body of the request.
 * @param {string} req.body.role - The new role to assign to the user.
 * @param {string} req.body.userId - The ID of the user whose role is to be updated.
 * @param {Object} res - Express response object.
 * @returns {Promise<Object>} The response object with a success message and the updated user data.
 */
async function changeUserRoleController(req, res) {
    // 1. Parse the incoming role and userId
    const role = req.body.role;
    const userId = req.body.userId; // This should be the id of the user whose role we want to update

    // 2. Call the service layer with the inputs
    const response = await changeUserRoleService(userId, role);

    // 3. Send the response
    return res.status(StatusCodes.OK).json({
        success: true,
        message: "User role updated successfully",
        data: response
    });
}

async function verifyEmailController(req, res) {
    throw new NotImplemented();
}

module.exports = {
    signupController,
    signinController,
    verifyEmailController,
    changeUserRoleController
}