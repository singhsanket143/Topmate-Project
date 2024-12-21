const { StatusCodes } = require("http-status-codes");

function validate(zodSchema) {
    return async function customMiddleware(req, res, next) {
        try {
            await zodSchema.parseAsync(req.body);
            next(); // Move to the next middleware
        } catch(error) {
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
    }
}

module.exports = validate;