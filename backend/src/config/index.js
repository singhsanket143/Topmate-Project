const dotenv = require('dotenv'); // Importing dotenv library

dotenv.config(); // load all the env variables from .env file

module.exports = {
    PORT: process.env.PORT || 3000, // Export PORT variable
}