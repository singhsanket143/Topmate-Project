const User = require('../schemas/user.schema');
const ENUM = require('../utils/constants');
const crudRepository = require('./crud.repository');

/**
 * User repository to handle user-related database operations.
 * 
 * @namespace userRepository
 */
const userRepository = {
    ...crudRepository(User),

    /**
     * Fetches a user document by email.
     * 
     * @function getUserByEmail
     * @memberof userRepository
     * @async
     * @param {string} email - The email of the user to fetch.
     * @returns {Promise<Object>} The user document with the specified email.
     */
    getUserByEmail: async function (email) {
        const userDoc = await User.findOne({
            email: email
        }).select('+password');
        return userDoc;
    },
    
    /**
     * Fetches all the users with the role 'mentor'.
     * 
     * @function getAllMentors
     * @memberof userRepository
     * @async
     * @returns {Promise<Array>} Array of mentors.
     */
    getAllMentors: async function () {
        const mentors = await User.find({
            role: ENUM.ROLE.MENTOR
        }).select('-password -verificationToken');
        return mentors;
    }
}

module.exports = userRepository;