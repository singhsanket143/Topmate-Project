const userRepository = require("../repositories/user.repository");
const BadRequest = require("../utils/errors/badRequestError");

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

module.exports = {
    signupUserService
}