const app = require('./app'); // Importing the express app object 
const { PORT } = require('./config'); // Importing the env variables
const connectDB = require('./config/db'); // Importing the database connection method
const { sendConfirmationMail } = require('./services/mail.service');

// Start running a server on the specified port
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);

    // After the express server is up, connect to the database
    connectDB();
});