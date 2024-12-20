const mongoose = require('mongoose'); // Importing mongoose library
const { DB_URL } = require('./index'); // Importing DB_URL from index.js


async function connectDB() {
    try {
        await mongoose.connect(DB_URL); // Connect to the database
        console.log("Connected to the Mongo Instance");

        mongoose.connection.on('disconnected', () => {
            console.log("Disconnected from the Mongo Instance");
        });

        mongoose.connection.on('error', (err) => {
            console.log("Error connecting to the Mongo Instance");
            console.error(err);
        });

    } catch(error) {
        console.log("Not able to connect with the Mongo Instance");
        console.error(error);
    }
}

module.exports = connectDB; // Exporting connectDB function