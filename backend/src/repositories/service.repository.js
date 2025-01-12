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
    },

    /**
     * 
     * This function updates a service by the mentor who has created it
     * 
     * @function updateServiceByMentor
     * @async 
     * @param {ObjectId} mentorId - Mentor id represents the mentor to which service belongs
     * @param {ObjectId} serviceId - Service id to be updated
     * @param {Object} data - Data to be updated
     * @returns {Promise<Object>} - Promise object represents the updated service
     */
    updateServiceByMentor: async (mentorId, serviceId, data) => {
        const updatedService = await Service.findOneAndUpdate({
            _id: serviceId,
            mentor: mentorId
        }, data, {
            new: true
        });
        return updatedService;
    }
};

module.exports = serviceRepository;