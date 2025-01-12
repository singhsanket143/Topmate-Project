const { StatusCodes } = require("http-status-codes");
const { createService, getServiceById, getAllServices } = require("../services/service.service");

/**
 * This controller function creates a service in the 
 * 
 * @function createServiceController
 * @async 
 * @param {Object} req - Incoming request object repsenting the HTTP request 
 * @param {Object} res - Outgoing response object used to send the HTTP response
 * @returns {Promise<void>} - Sends a JSON response with the newly created service
 */
async function createServiceController(req, res) {
    // 1. Call the service layer to create a new service object
    const response = await createService({
        ...req.body,
        mentor: req.user._id
    });

    // 2. Send the response back to the client
    return res.status(StatusCodes.CREATED).json({
        success: true,
        message: "Created a new service",
        data: response
    });
}

/**
 * 
 * This controller function fetches a service from the database based on the serviceId
 * 
 * @function getServiceByIdController
 * @async 
 * @param {Object} req - Incoming request object repsenting the HTTP request 
 * @param {Object} res - Outgoing response object used to send the HTTP response
 * @returns {Promise<void>} - Sends a JSON response with the service
 */
async function getServiceByIdController(req, res) {
    // 1. Call the service layer and fetch the service object
    const response = await getServiceById(req.params.serviceId);

    // 2. Send the response back to the client
    return res.status(StatusCodes.OK).json({
        success: true,
        message: "Service fetched successfully",
        data: response
    });
};

/**
 * 
 * This controller function fetches a list of all services from the database
 * 
 * @function getAllServicesController
 * @async 
 * @param {Object} req - Incoming request object repsenting the HTTP request 
 * @param {Object} res - Outgoing response object used to send the HTTP response
 * @returns {Promise<void>} - Sends a JSON response with the list of services
 */
async function getAllServicesController(req, res) {
    // 1. Call the service layer to fetch the list of services
    const response = await getAllServices();

    // 2. Send the response back to the client
    return res.status(StatusCodes.OK).json({
        success: true,
        message: "Fetched all services",
        data: response
    });
}

module.exports = {
    createServiceController,
    getServiceByIdController,
    getAllServicesController
}