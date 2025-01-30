const userRepository = require("../repositories/user.repository");
const NotFound = require("../utils/errors/notFoundError");

/**
 * Retrieves user details by user ID.
 *
 * @async
 * @function getUserDetailsService
 * @param {string} userId - The ID of the user to retrieve.
 * @returns {Promise<Object>} The user details.
 * @throws {NotFound} If the user with the given ID is not found.
 */
async function getUserDetailsService(userId) {
    const user = await userRepository.getById(userId);
    if(!user) {
        throw new NotFound("User for the given id not found", {
            errorContext: "User id not found in the database"
        });
    }
    return user;
}

module.exports = {
    getUserDetailsService
}