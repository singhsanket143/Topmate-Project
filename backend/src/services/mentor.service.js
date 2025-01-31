const { getAllMentors, update, getMentorInformationByUsername, getMentorInformationByUserId } = require("../repositories/user.repository");
const NotFound = require('../utils/errors/notFoundError');
/**
 * Retrieves all mentors.
 *
 * @async
 * @function getAllMentorsService
 * @returns {Promise<Array>} A promise that resolves to an array of mentors.
 */
async function getAllMentorsService() {
    const mentors = getAllMentors();
    return mentors;
}

/**
 * Verifies a mentor by updating their verification status.
 *
 * @async
 * @function verifyMentorService
 * @param {string} mentorId - The ID of the mentor to verify.
 * @returns {Promise<Object>} The updated mentor object with verification status.
 */
async function verifyMentorService(mentorId) {
    const verifiedMentor = await update(mentorId, { verified: true });
    return verifiedMentor;
}

/**
 * Retrieves mentor information by username.
 *
 * @async
 * @function getMentorInfoByUsernameService
 * @param {string} username - The username of the mentor.
 * @returns {Promise<Object>} The mentor information.
 * @throws {NotFound} If no mentor is found with the given username.
 */
async function getMentorInfoByUsernameService(username) {
    const mentor = await getMentorInformationByUsername(username);

    if(!mentor) {
        throw new NotFound("Mentor with the given username not found");
    }

    return mentor;
}

/**
 * Retrieves mentor information by id.
 *
 * @async
 * @function getMentorInfoByIdService
 * @param {string} mentorId - The objectid of the mentor.
 * @returns {Promise<Object>} The mentor information.
 * @throws {NotFound} If no mentor is found with the given id.
 */
async function getMentorInfoByIdService(mentorId) {
    const mentor = await getMentorInformationByUserId(mentorId);

    if(!mentor) {
        throw new NotFound("Mentor with the given id not found");
    }

    return mentor;
}

module.exports = {
    getAllMentorsService,
    verifyMentorService,
    getMentorInfoByUsernameService,
    getMentorInfoByIdService
}