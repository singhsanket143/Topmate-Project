const { StatusCodes } = require("http-status-codes");

function notImplementedResponse(res) {
    return res.status(StatusCodes.NOT_IMPLEMENTED).json({
        success: false,
        message: "Not implemented"
    });
}

module.exports = {
    notImplementedResponse
}