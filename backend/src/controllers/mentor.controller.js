const { StatusCodes } = require("http-status-codes");
const { getAllMentorsService, verifyMentorService } = require("../services/mentor.service");

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

module.exports = {
    getAllMentorsController,
    verifyMentorController
}