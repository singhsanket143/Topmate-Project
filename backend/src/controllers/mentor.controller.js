const { StatusCodes } = require("http-status-codes");
const { getAllMentorsService, verifyMentorService, getMentorInfoByUsernameService, getMentorInfoByIdService } = require("../services/mentor.service");

/**
 * Controller to get all mentors.
 * 
 * This function handles the request to fetch all mentors by calling the mentor service.
 * It then sends the response back to the client with the list of mentors.
 * 
 * @async
 * @function getAllMentorsController
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>} - Returns a promise that resolves to void
 */
async function getAllMentorsController(req, res) {
    // 1. Call the mentor service to fetch all the mentors 
    const response = await getAllMentorsService();

    // 2. Send the response back to the client
    return res.status(StatusCodes.OK).json({
        success: true,
        message: "Fetched all the mentors successfully",
        data: response
    });
}


/**
 * Controller to get any mentor's information by username.
 * 
 * This function handles the request to fetch a mentor's information by calling the mentor service.
 * 
 * @async 
 * @function getMentorInfoByUserNameController
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function getMentorInfoByUserNameController(req, res) {
    // 1. Call the mentor service to fetch the mentor information
    const response = await getMentorInfoByUsernameService(req.params.username);

    // 2. Send the response back to the client
    return res.status(StatusCodes.OK).json({
        success: true,
        message: "Fetched mentor information successfully",
        data: response
    });
}

/**
 * Controller to verify a mentor.
 *
 * @async
 * @function verifyMentorController
 * @param {Object} req - Express request object.
 * @param {Object} req.params - Request parameters.
 * @param {string} req.params.mentorId - ID of the mentor to verify.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} Sends a JSON response with the verification result.
 */
async function verifyMentorController(req, res) {
    // 1. Call the mentor service to verify the mentor
    const response = await verifyMentorService(req.params.mentorId);

    // 2. Send the response back to the client
    return res.status(StatusCodes.OK).json({
        success: true,
        message: "Mentor verified successfully",
        data: response
    });
}

/**
 * Controller to get mentor information by ID.
 *
 * @param {Object} req - The request object.
 * @param {Object} req.params - The request parameters.
 * @param {string} req.params.mentorId - The ID of the mentor.
 * @param {Object} res - The response object.
 * @returns {Promise<Object>} The response object with mentor information.
 */
async function getMentorInfoByIdController(req, res) {
    // 1. Call the mentor service to fetch the mentor information
    const response = await getMentorInfoByIdService(req.params.mentorId);

    // 2. Send the response back to the client
    return res.status(StatusCodes.OK).json({
        success: true,
        message: "Fetched mentor information successfully",
        data: response
    });
}

module.exports = {
    getAllMentorsController,
    verifyMentorController,
    getMentorInfoByUserNameController,
    getMentorInfoByIdController
}