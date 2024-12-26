const dotenv = require('dotenv'); // Importing dotenv library

dotenv.config(); // load all the env variables from .env file

module.exports = {
    PORT: process.env.PORT || 3000, // Export PORT variable,
    DB_URL: process.env.DB_URL,
    ROUTE_PREFIX: process.env.ROUTE_PREFIX || '/api/v1',
    NODE_ENV: process.env.NODE_ENV || 'development',
}
