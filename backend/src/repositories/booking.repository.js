const Booking = require("../schemas/booking.schema");
const crudRepository = require("./crud.repository");

/**
 * Repository for managing Booking entities.
 * Extends the basic CRUD operations provided by crudRepository.
 * 
 */
const bookingRepository = {
    ...crudRepository(Booking)
};

module.exports = bookingRepository;