const userRepository = require("../repositories/user.repository");
const NotFound = require("../utils/errors/notFoundError");

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