const { StatusCodes } = require("http-status-codes");
const CustomError = require("../CustomError");

class UnAuthorized extends CustomError {
    constructor(message, error) {
        super(message || "You are unauthorized for this operation", StatusCodes.UNAUTHORIZED, error);
    }
}

module.exports = UnAuthorized;