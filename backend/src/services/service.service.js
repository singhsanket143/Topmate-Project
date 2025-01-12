const serviceRepository = require("../repositories/service.repository");
const NotFound = require("../utils/errors/notFoundError");

/**
 * 
 * This function creates a new service in the database
 * 
 * @function createService
 * @async 
 * @param {Object} serviceData - Object containing data for new service creation
 * @returns {Promise<Object>} - Promise object represents the newly created service
 */
const createService = async (serviceData) => {
    const newService = await serviceRepository.create(serviceData);
    return newService;
}

/**
 * 
 * This function fetches a service from the database based on the serviceId
 * 
 * @function getServiceById
 * @async 
 * @param {ObjectId} serviceId - Id of the service to be fetched 
 * @returns {Promise<Object>} - Promise object representing the service fetched from the database
 */
const getServiceById = async (serviceId) => {
    const service = await serviceRepository.getById(serviceId);
    if(!service) {
        throw new NotFound(`Service with id ${serviceId} not found`);
    }
    return service;
}

/**
 * 
 * This function fetches the list of all the services from the database
 * 
 * @function getAllServices
 * @async 
 * @returns {Promise<Array>} - Promise object represents the list of services fetched from the database
 */
const getAllServices = async () => {
    const services = await serviceRepository.getAll();
    return services;
}

module.exports = {
    createService,
    getServiceById,
    getAllServices
}