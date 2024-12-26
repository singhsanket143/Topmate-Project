const { StatusCodes } = require("http-status-codes");
const CustomError = require("../CustomError");

class NotFound extends CustomError {
    constructor(message, error) {
        super(message, StatusCodes.NOT_FOUND, error);
    }
}

module.exports = NotFound;