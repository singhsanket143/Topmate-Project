const mongoose = require('mongoose'); // Import mongoose

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