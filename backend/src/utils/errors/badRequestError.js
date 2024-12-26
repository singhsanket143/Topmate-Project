const { StatusCodes } = require("http-status-codes");
const CustomError = require("../CustomError");

class BadRequest extends CustomError {
    constructor(message, error) {
        super(message, StatusCodes.BAD_REQUEST, error);
    }
}

module.exports = BadRequest;