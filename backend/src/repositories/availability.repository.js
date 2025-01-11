const Availability = require('../schemas/availability.schema');
const crudRepository = require('./crud.repository');

/**
 * Repository for managing availability data.
 * 
 * This repository provides CRUD operations for the Availability model
 * by extending the base CRUD repository.
 */
const availabilityRepository = {
    ...crudRepository(Availability),

    /**
     * 
     * This function fetches the availability record of the mentor based on the mentorId
     * 
     * @function - getAvailabilityByMentorId
     * @async 
     * @param {ObjectId} mentorId - Id of the mentor whose availability is to be fetched
     * @returns {Promise<Object>} - Availability object
     */
    getAvailabilityByMentorId: async (mentorId) => {
        const response = await Availability.find({
            user: mentorId,
        });
        return response;
    }
}

module.exports = availabilityRepository;