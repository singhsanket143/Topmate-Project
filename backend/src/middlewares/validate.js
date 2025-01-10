const { StatusCodes } = require("http-status-codes");

function validateBody(zodSchema) {
    return async function customMiddleware(req, res, next) {
        try {
            console.log(req.body);
            await zodSchema.parseAsync(req.body);
            next(); // Move to the next middleware
        } catch(error) {
            createErrorForZodValidation(error, req, res);
        }
    }
}

function validateParams(zodSchema) {
    return async function customMiddleware(req, res, next) {
        try {
            await zodSchema.parseAsync(req.params);
            next();
        } catch(error) {
            createErrorForZodValidation(error, req, res);
        }
    }
}

function createErrorForZodValidation(error, req, res) {
    let message = [];
    error.errors.forEach((err) => {
        message.push(err.message);
    });
    return res.status(StatusCodes.BAD_REQUEST).json({
        message: message,
        success: false,
        data: null
    });
}

module.exports = {
    validateBody,
    validateParams
};