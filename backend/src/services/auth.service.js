const userRepository = require("../repositories/user.repository");
const BadRequest = require("../utils/errors/badRequestError");
const NotFound = require("../utils/errors/notFoundError");
const { generateAuthToken, generateRefreshToken } = require("./token.service");


/**
 * Service to handle user signup.
 *
 * @async
 * @function signupUserService
 * @param {Object} userData - The data of the user to be created.
 * @param {string} userData.username - The username of the user.
 * @param {string} userData.password - The password of the user.
 * @param {string} userData.email - The email of the user.
 * @returns {Promise<Object>} The created user object.
 * @throws {BadRequest} If the user already exists.
 * @throws {Error} If there is an error during user creation.
 */
async function signupUserService(userData) {
    try {
        const user = await userRepository.create(userData);
        return user;
    } catch(error) {
        console.log(error.name, error.cause.code);
        if(error.name === "MongooseError" && error.cause.code === 11000) {
            throw new BadRequest("User already exists", error.cause);
        }
        throw error;
    }
}

/**
 * Service to sign in a user.
 *
 * @param {Object} userData - The user data.
 * @param {string} userData.email - The email of the user.
 * @param {string} userData.password - The password of the user.
 * @returns {Promise<Object>} An object containing the access token and refresh token.
 * @throws {NotFound} If the user for the given email is not found.
 * @throws {BadRequest} If the provided password is invalid.
 */
async function signinUserService(userData) {
    const { email, password } = userData;

    // 1. Fetch the user details by the email id
    const user = await userRepository.getUserByEmail(email);

    // 2. If the user is not found, throw an error
    if(!user) {
        throw new NotFound("User for the given email not found");
    }

    // 3. Compare the incoming password with the user hashed stored password
    const isPasswordMatching = await user.comparePassword(password);

    // 4. If the password is not matching, throw an error
    if(!isPasswordMatching) {
        throw new BadRequest("Invalid password provided");
    }

    // 5. Create a new JWT token
    const accessToken = generateAuthToken(user);

    // 6. Create a new refresh token
    const refreshToken = generateRefreshToken(user);

    return {
        accessToken,
        refreshToken
    };

}

/**
 * Changes the role of a user.
 *
 * @param {string} userId - The ID of the user whose role is to be changed.
 * @param {string} role - The new role to be assigned to the user.
 * @returns {Promise<Object>} The response from the user repository update function.
 */
async function changeUserRoleService(userId, role) {
    // 1. Call the crud repository update function to update the role
    const response = await userRepository.update(userId, { role: role.toLowerCase() });

    // 2. return the response
    return response;
}

module.exports = {
    signupUserService,
    signinUserService,
    changeUserRoleService
}