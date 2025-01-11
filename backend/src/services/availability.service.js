const availabilityRepository = require("../repositories/availability.repository");
const userRepository = require("../repositories/user.repository");
const ENUM = require("../utils/constants")
const Forbidden = require('../utils/errors/forbiddenError');
const NotFound = require("../utils/errors/notFoundError");

/**
 * 
 * This function checks if the incoming user is a valid mentor or not and if yes then creates availability
 * based on the incoming availabilityData
 * 
 * @param {Object} user - Authenticated user onject 
 * @param {Object} availabilityData - Object containing availability data for the mentor
 * @returns {Promise<Object>} - Newly created avaialbility object
 */
const createAvailabilityService = async (user, availabilityData) => {
    // 1. Check if the user is a mentor or not ?
    const isMentor = user.role === ENUM.ROLE.MENTOR;

    if(!isMentor) {
        throw new Forbidden("Only mentors can create availability");
    }

    // 2. Create availability
    const availability = await availabilityRepository.create({
        ...availabilityData,
        user: user._id
    });

    return availability;

};

/**
 * 
 * GetAvailabilityService fetches the availability record of the mentor based on the mentorId/userId
 * 
 * @function - getAvailabilityService
 * @async
 * @param {ObjectId} userId - Id of the user whose availability is to be fetched 
 * @returns {Promise<Object>} - Availability object
 */
const getAvailabilityService = async (mentorId) => {

    // 1. Check if a user with this id exist or not ? 
    const mentor = await userRepository.getById(mentorId);

    if(!mentor || mentor.role !== ENUM.ROLE.MENTOR) {
        throw new NotFound("No mentor found with this id");
    }

    const availability = await availabilityRepository.getAvailabilityByMentorId(mentorId);
    return availability;
}

module.exports = {
    createAvailabilityService,
    getAvailabilityService
}