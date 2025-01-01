const mongoose = require('mongoose'); // Importing mongoose

/**
 * Service collection schema
 * 
 * This schema defines how the service document should look like in the MongoDB database.
 * 
 * @property {String} name - The name of the service. It is required and trimmed.
 * @property {String} description - The description of the service. It is required and trimmed.
 * @property {ObjectId} mentor - The mentor who created the service. It is required.
 * @property {Number} price - The price of the service. It is required.
 * @property {Boolean} active - Indicates if the service is active. Default is true.
 * @property {Number} duration - The duration of the service in minutes. It is required.
 * 
 */
const serviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Service name is required to create a service"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Service description is required to create a service"],
        trim: true
    },
    mentor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Mentor is required to create a service"]
    },
    price: {
        type: Number,
        required: [true, "Price is required to create a service"],
    },
    active: {
        type: Boolean,
        default: true
    },
    duration: {
        type: Number,
        required: [true, "Duration is required to create a service"]
    }
}, { timestamps: true });

const Service = mongoose.model("Service", serviceSchema);

module.exports = Service;