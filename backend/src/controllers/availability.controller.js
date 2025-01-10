const { StatusCodes } = require("http-status-codes");
const { createAvailabilityService } = require("../services/availability.service");

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

module.exports = {
    createAvailabilityController
}