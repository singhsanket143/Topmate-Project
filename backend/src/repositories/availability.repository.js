const Availability = require('../schemas/availability.schema');
const crudRepository = require('./crud.repository');

/**
 * Repository for managing availability data.
 * 
 * This repository provides CRUD operations for the Availability model
 * by extending the base CRUD repository.
 */
const availabilityRepository = {
    ...crudRepository(Availability)
}

module.exports = availabilityRepository;