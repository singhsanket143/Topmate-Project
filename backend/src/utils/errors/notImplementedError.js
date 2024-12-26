const { StatusCodes } = require("http-status-codes");
const CustomError = require("../CustomError");

class NotImplemented extends CustomError {
    constructor() {
        super("Not implemented", StatusCodes.NOT_IMPLEMENTED);
    }
}

module.exports = NotImplemented;