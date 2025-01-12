const crudRepository = require('./crud.repository');
const Service = require('../schemas/service.scehma');

/**
 * Repository for performing CRUD operations on the Service model.
 * 
 * This repository extends the base CRUD repository with the Service model.
 * 
 * @namespace serviceRepository
 */
const serviceRepository = {
    ...crudRepository(Service),

    /**
     * 
     * This function fetches all the services which are associated to a mentor ID
     * 
     * @function getServicesByMentorId
     * @async 
     * @param {ObjectId} mentorId - Mentor id representing unique id of the mentor whose services are to be fetched 
     * @returns {Promise<Object>} - Promise object represents the list of services fetched from the database
     */
    getServicesByMentorId: async (mentorId) => {
        const services = await Service.find({
            mentor: mentorId,
        });
        return services;
    }
};

module.exports = serviceRepository;