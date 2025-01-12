const serviceRepository = require("../repositories/service.repository");
const userRepository = require('../repositories/user.repository');
const ENUM = require("../utils/constants");
const Forbidden = require("../utils/errors/forbiddenError");
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

/**
 * 
 * This function fetches all the services listed by a mentor
 * 
 * @function getServicesByMentorId 
 * @async 
 * @param {ObjectId} mentorId - ObjectID representing the mentor for whom we have to fetch the services 
 * @returns {Promise<Object>} - Promise object represents the list of services fetched from the database
 */
const getSevicesByMentorId = async (mentorId) => {

    // 1. Check if a valid mentor exists for the corresponding id or not ?\
    const mentor = await userRepository.getById(mentorId);
    console.log(mentor)

    if(!mentor || mentor.role === ENUM.ROLE.MENTEE) {
        throw new NotFound(`Mentor with id ${mentorId} not found`);
    }

    const services = await serviceRepository.getServicesByMentorId(mentorId);
    return services;
};

/**
 * 
 * This function updates a service in the database
 * 
 * @function updateService
 * @async 
 * @param {ObjectId} serviceId - Id representing the service to be updated
 * @param {Object} serviceData - Object containing the updated data for the service
 * @returns {Promise<Object>} - Promise object represents the updated service
 */
const updateService = async (user, serviceId, serviceData) => {
    // const updatedService = await serviceRepository.updateServiceByMentor(user._id, serviceId, serviceData);

    // if(!updatedService) {
    //     throw new NotFound(`Service with id ${serviceId} not found`);
    // }
    // return updatedService;

    const service = await serviceRepository.getById(serviceId);
    if(!service) {
        throw new NotFound(`Service with id ${serviceId} not found`);
    }

    if(service.mentor.toString() !== user._id.toString()) {
        throw new Forbidden("You are not authorized to update this service");
    }

    const updatedService = await serviceRepository.update(serviceId, serviceData);
    return updatedService;
}

module.exports = {
    createService,
    getServiceById,
    getAllServices,
    getSevicesByMentorId,
    updateService
}