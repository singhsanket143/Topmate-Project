const jwt = require('jsonwebtoken'); // Import JWT
const moment = require('moment'); // Import Moment
const { JWT_CONFIG } = require('../config'); // Importing JWT from config
/**
 * @userId The unique identifier for the user
 * @expiresIn The expiration time for the token
 * @secretKey The secret key used for signing the token
 * 
 * The below function generates a JWT token with the specified userId, expiration time, and secret key
 */
const generateToken = (userId, expiresIn, secretKey) => {
    // 1. Construct the payload
    const payload = {
        _id: userId,
        iat: moment().unix(), // When was the token issued
        exp: expiresIn.unix() // When does the token expire
    };

    // 2. Generate the token
    return jwt.sign(payload, secretKey);
}

/**
 * @param { Basic details for user } user
 * Generate an access token for the user authentication
 */
const generateAuthToken = (user) => {
    // 1. Create expiry object
    console.log(new Date(moment()));
    const accessTokenExpires = moment().add(
        JWT_CONFIG.ACCESS_EXPIRY, "hour"
    );

    console.log(new Date(accessTokenExpires));

    // 2. Generate the token
    const accessToken = generateToken(
        user._id,
        accessTokenExpires,
        JWT_CONFIG.ACCESS_SECRET
    );

    return accessToken;
}

/**
 * 
 * @param { A unique identifier to add to the payload } id 
 * @returns A new verification token based on JWT
 */
const generateVerificationToken = (id) => {
    // 1. Create expiry object
    const verificationTokenExpires = moment().add(
        JWT_CONFIG.VERIFICATION_EXPIRY, "hour"
    );

    // 2. Generate the token
    const verificationToken = generateToken(
        id,
        verificationTokenExpires,
        JWT_CONFIG.ACCESS_SECRET
    );

    return verificationToken;
}

/**
 * 
 * @param { User object containing user details } user 
 * @returns a new verification token based on JWT
 */
const generateRefreshToken = (user) => {
    // 1. Create expiry object
    const refreshTokenExpires = moment().add(
        JWT_CONFIG.REFRESH_EXPIRY, "days"
    );

    // 2. Generate the token
    const refreshToken = generateToken(
        user._id,
        refreshTokenExpires,
        JWT_CONFIG.REFRESH_SECRET
    );

    return refreshToken;
}

const verifyToken = (token, secret) => {
    return jwt.verify(token, secret);
}

module.exports = {
    generateAuthToken,
    generateVerificationToken,
    generateRefreshToken,
    verifyToken
}