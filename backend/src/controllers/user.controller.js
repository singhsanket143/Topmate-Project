const { StatusCodes } = require("http-status-codes");
const { getUserDetailsService } = require("../services/user.service");

/**
 * Retrieves user details based on the provided user ID.
 *
 * @param {Object} req - The request object.
 * @param {Object} req.params - The request parameters.
 * @param {string} req.params.userId - The ID of the user to retrieve details for.
 * @param {Object} res - The response object.
 * @returns {Promise<Object>} The response object containing user details.
 */
async function getUserDetails(req, res) {
    // 1. Call the service function
    const response = await getUserDetailsService(req.params.userId);

    // 2. Send the response
    return res.status(StatusCodes.OK).json({
        message: "User found successfully",
        data: response,
        success: true,
        errorContext: null 
    });
}

module.exports = {
    getUserDetails
};