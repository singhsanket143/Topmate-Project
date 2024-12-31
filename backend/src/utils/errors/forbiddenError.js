const { StatusCodes } = require("http-status-codes");
const CustomError = require("../CustomError");

class Forbidden extends CustomError {
    constructor(message, error) {
        super(message || "You don't have sufficient permissions for this operation", StatusCodes.UNAUTHORIZED, error);
    }
}

module.exports = Forbidden;