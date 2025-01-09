const { getAllMentors, update, getMentorInformationByUsername } = require("../repositories/user.repository");
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

async function getMentorInfoByUsernameService(username) {
    const mentor = await getMentorInformationByUsername(username);

    if(!mentor) {
        throw new NotFound("Mentor with the given username not found");
    }

    return mentor;
}

module.exports = {
    getAllMentorsService,
    verifyMentorService,
    getMentorInfoByUsernameService
}