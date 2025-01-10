const mongoose = require('mongoose');

/**
 * Availability Schema
 * 
 * This schema defines the availability of a user for each day of the week and any specific unavailable dates.
 * 
 * @typedef {Object} AvailabilitySchema
 * @property {ObjectId} user - The user ID to whom the availability belongs.
 * @property {Object} weekAvaialability - The weekly availability of the user.
 * @property {Array<Object>} weekAvaialability.monday - Availability slots for Monday.
 * @property {String} weekAvaialability.monday[].startTime - Start time of the availability slot.
 * @property {String} weekAvaialability.monday[].endTime - End time of the availability slot.
 * @property {Array<Object>} weekAvaialability.tuesday - Availability slots for Tuesday.
 * @property {String} weekAvaialability.tuesday[].startTime - Start time of the availability slot.
 * @property {String} weekAvaialability.tuesday[].endTime - End time of the availability slot.
 * @property {Array<Object>} weekAvaialability.wednesday - Availability slots for Wednesday.
 * @property {String} weekAvaialability.wednesday[].startTime - Start time of the availability slot.
 * @property {String} weekAvaialability.wednesday[].endTime - End time of the availability slot.
 * @property {Array<Object>} weekAvaialability.thursday - Availability slots for Thursday.
 * @property {String} weekAvaialability.thursday[].startTime - Start time of the availability slot.
 * @property {String} weekAvaialability.thursday[].endTime - End time of the availability slot.
 * @property {Array<Object>} weekAvaialability.friday - Availability slots for Friday.
 * @property {String} weekAvaialability.friday[].startTime - Start time of the availability slot.
 * @property {String} weekAvaialability.friday[].endTime - End time of the availability slot.
 * @property {Array<Object>} weekAvaialability.saturday - Availability slots for Saturday.
 * @property {String} weekAvaialability.saturday[].startTime - Start time of the availability slot.
 * @property {String} weekAvaialability.saturday[].endTime - End time of the availability slot.
 * @property {Array<Object>} weekAvaialability.sunday - Availability slots for Sunday.
 * @property {String} weekAvaialability.sunday[].startTime - Start time of the availability slot.
 * @property {String} weekAvaialability.sunday[].endTime - End time of the availability slot.
 * @property {Array<Date>} unavailableDates - Specific dates when the user is unavailable.
 * 
 * @property {Date} createdAt - Timestamp when the availability was created.
 * @property {Date} updatedAt - Timestamp when the availability was last updated.
 */
const availabilitySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User details are required to create an availability"]
    },
    weekAvailability: {
        monday: [{
            startTime: {
                type: String,
                required: [true, "Start time is required to add an availability slot"]
            },
            endTime: {
                type: String,
                required: [true, "End time is required to add an availability slot"]
            }
        }],
        tuesday: [
            {
                startTime: {
                    type: String,
                    required: [true, "Start time is required to add an availability slot"]
                },
                endTime: {
                    type: String,
                    required: [true, "End time is required to add an availability slot"]
                }
            }
        ],
        wednesday: [
            {
                startTime: {
                    type: String,
                    required: [true, "Start time is required to add an availability slot"]
                },
                endTime: {
                    type: String,
                    required: [true, "End time is required to add an availability slot"]
                }
            }
        ],
        thursday: [
            {
                startTime: {
                    type: String,
                    required: [true, "Start time is required to add an availability slot"]
                },
                endTime: {
                    type: String,
                    required: [true, "End time is required to add an availability slot"]
                }
            }
        ],
        friday: [
            {
                startTime: {
                    type: String,
                    required: [true, "Start time is required to add an availability slot"]
                },
                endTime: {
                    type: String,
                    required: [true, "End time is required to add an availability slot"]
                }
            }
        ],
        saturday: [
            {
                startTime: {
                    type: String,
                    required: [true, "Start time is required to add an availability slot"]
                },
                endTime: {
                    type: String,
                    required: [true, "End time is required to add an availability slot"]
                }
            }
        ],
        sunday: [
            {
                startTime: {
                    type: String,
                    required: [true, "Start time is required to add an availability slot"]
                },
                endTime: {
                    type: String,
                    required: [true, "End time is required to add an availability slot"]
                }
            }
        ]
    },
    unavailableDates: [
        {
            date: {
                type: Date,
                required: [true, "Unavailable date is required to add an unavailable date"]
            }
        }
    ]
}, { timestamps: true });

const Availability = mongoose.model('Availability', availabilitySchema);

module.exports = Availability;