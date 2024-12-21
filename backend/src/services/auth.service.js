const userRepository = require("../repositories/user.repository");

async function signupUserService(userData) {
    const user = await userRepository.create(userData);
    return user;
}

module.exports = {
    signupUserService
}