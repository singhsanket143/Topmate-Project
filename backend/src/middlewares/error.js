const { StatusCodes } = require("http-status-codes");
const CustomError = require("../utils/CustomError");
const { NODE_ENV } = require("../config");

const errorHandler = (err, req, res, next) => {
    console.error(err);
    // We can detect if the error is known to us or now ? 
    if(err instanceof CustomError) {
        const { message, statusCode, errorContext} = err;
        return res.status(statusCode).json({
            success: false,
            message,
            errorContext: (NODE_ENV === 'development') ? errorContext : null,
            data: null
        });;
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: err.message,
        success: false,
        data: null,
        errorContext: err
    });
}

module.exports = {
    errorHandler
}