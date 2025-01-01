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
    ...crudRepository(Service)
};

module.exports = serviceRepository;