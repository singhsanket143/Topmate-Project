const { StatusCodes } = require("http-status-codes");
const { getUserDetailsService } = require("../services/user.service");

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