const { StatusCodes } = require("http-status-codes");
const { createService } = require("../services/service.service");

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

module.exports = {
    createServiceController
}