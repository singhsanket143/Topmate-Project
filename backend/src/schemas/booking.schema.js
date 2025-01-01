const mongoose = require('mongoose');
const ENUM = require('../utils/constants');

/**
 * Booking Schema
 * 
 * This schema contains the structure of the booking document in the MongoDB database.
 * 
 * @property {ObjectId} service - The service associated with the booking. It is required.
 * @property {ObjectId} mentee - The mentee who booked the service. It is required.
 * @property {ObjectId} mentor - The mentor who will provide the service. It is required.
 * @property {Number} price - The price of the booking. It is required.
 * @property {String} meetingLink - The link for the meeting. It is optional.
 * @property {String} status - The status of the booking. It can be "pending", "completed", "cancelled", or "confirmed". Default is "pending".
 * @property {Date} dateAndTime - The date and time of the booking. It is required.
 * 
 */
const bookingSchema = new mongoose.Schema({
    service: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service",
        required: [true, "Service details is required to create a booking"]
    },
    mentee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Mentee details is required to create a booking "]
    },
    mentor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Mentor details is required to create a booking"]
    },
    price: {
        type: Number,
        required: [true, "Price is required to create a booking"]
    },
    meetingLink: {
        type: String
    },
    status: {
        type: String,
        enum: [ENUM.STATUS.PENDING, ENUM.STATUS.COMPLETED, ENUM.STATUS.CANCELLED, ENUM.STATUS.CONFIRMED],
        default: ENUM.STATUS.PENDING
    },
    dateAndTime: {
        type: Date,
        required: [true, "Date and time is required to create a booking"]
    }
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;