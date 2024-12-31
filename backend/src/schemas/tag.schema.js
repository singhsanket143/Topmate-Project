const mongoose = require('mongoose'); // Import mongoose

/**
 * Schema definition for the Tag model.
 * 
 * @typedef {Object} Tag
 * @property {String} name - The name of the tag. This field is required and will be trimmed.
 * @property {Array<ObjectId>} users - An array of user IDs associated with the tag. Defaults to an empty array.
 * @property {Date} createdAt - The timestamp when the tag was created.
 * @property {Date} updatedAt - The timestamp when the tag was last updated.
 */
const tagSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Tag name is required"],
        trim: true
    },
    users: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User",
        default: []
    }  
}, { timestamps: true });

const Tag = mongoose.model("Tag", tagSchema); // Create a model

module.exports = Tag; // Export the model