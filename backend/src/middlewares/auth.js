const { JWT_CONFIG } = require("../config");
const { verifyToken } = require("../services/token.service");
const { getUserDetailsService } = require("../services/user.service");
const Forbidden = require("../utils/errors/forbiddenError");
const UnAuthorized = require("../utils/errors/unauthorizedError");

/**
 * 
 * @param { Incoming request object } req 
 * @param { Response object that will be returned } res 
 * @param { Next middleware in line} next 
 * @returns Unauthorised exception if JWT token is not present or invalid
 * 
 * This method is used to protect routes that require a valid JWT token to be present in the request headers
 */
const protect = async (req, res, next) => {
    let token;
    // 1. Fetch the token from the request header
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        // 2. Split the header to get the token
        token = req.headers.authorization.split(' ')[1];
    }

    // 3. Check if the token was successfully fetched or not
    if(!token) {
        throw new UnAuthorized("Auth token is missing from the rwequest");
    }

    console.log(token);

    // 4. Verify if the token is valid or not ?
    try {
        const tokenVerificationResponse = verifyToken(token, JWT_CONFIG.ACCESS_SECRET);

        // 5. If the token is valid, add the user details to the request object
        const user = await getUserDetailsService(tokenVerificationResponse._id);
        if(!user) {
            throw new UnAuthorized("User not found");
        }

        // 6. Add the user details to the request object
        req.user = user;

        // 7. Move to the next middleware
        next();
    } catch(error) {
        console.error("Error verifying token: ", error);
        throw new UnAuthorized("Invalid auth token provided");        
    }
}

/**
 * Middleware to restrict access to specific roles.
 * 
 * @param {...string} roles - The roles that are allowed access.
 * @returns {Function} Middleware function to check user role.
 * @throws {Forbidden} If the user's role is not included in the allowed roles.
 */
const restrictTo = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)) {
            throw new Forbidden();
        }
        next();
    }
}

module.exports = {
    protect,
    restrictTo
}