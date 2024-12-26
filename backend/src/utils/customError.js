class CustomError extends Error {
    constructor(message, statusCode, errorContext) {
        super(message);
        this.statusCode = statusCode;
        this.errorContext = errorContext; // This will be used to provide more context to the error
    }
}

module.exports = CustomError;