const { StatusCodes } = require("http-status-codes");
const { createAvailabilityService, getAvailabilityService } = require("../services/availability.service");

/**
 * 
 * Controller to create availability for a mentor
 * 
 * @async
 * @function createAvailabilityController
 * @param {Object} req - Incoming http request object
 * @param {*} res - Outgoing http response object
 * @returns 
 */
async function createAvailabilityController(req, res) {

    // 1. Call the service to create availability
    const availability = await createAvailabilityService(req.user, req.body);

    // 2. Send the response back to the client
    return res.status(StatusCodes.CREATED).json({
        success: true,
        message: "Availability created successfully",
        data: availability
    });
}

/**
 * Controller to handle fetching availability for a mentor.
 *
 * @async
 * @function getAvailabilityController
 * @param {Object} req - Express request object.
 * @param {Object} req.params - Request parameters.
 * @param {string} req.params.mentorId - ID of the mentor to fetch availability for.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} Sends a JSON response with the availability data.
 */
async function getAvailabilityController(req, res) {
    // 1. Call the service to fetch availability
    const response = await getAvailabilityService(req.params.mentorId);

    // 2. Send the response back to the client
    return res.status(StatusCodes.OK).json({
        success: true,
        message: "Availability fetched successfully",
        data: response
    });
}

module.exports = {
    createAvailabilityController,
    getAvailabilityController
}