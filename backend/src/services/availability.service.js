const availabilityRepository = require("../repositories/availability.repository");
const ENUM = require("../utils/constants")
const Forbidden = require('../utils/errors/forbiddenError');

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

module.exports = {
    createAvailabilityService
}