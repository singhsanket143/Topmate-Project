const userRepository = require("../repositories/user.repository");
const BadRequest = require("../utils/errors/badRequestError");
const NotFound = require("../utils/errors/notFoundError");
const { generateAuthToken, generateRefreshToken } = require("./token.service");
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


module.exports = {
    signupUserService,
    signinUserService
}