const nodemailer = require('nodemailer');

const { EMAIL } = require('./index');

/**
 * Creates a transporter object using the default SMTP transport.
 * 
 * @constant {Object} transporter - The transporter object for sending emails.
 * @property {string} service - The email service to use (e.g., 'Gmail').
 * @property {string} host - The hostname or IP address to connect to (e.g., 'smtp.gmail.com').
 * @property {number} port - The port to connect to (e.g., 587).
 * @property {Object} auth - The authentication object.
 * @property {string} auth.user - The username for authentication.
 * @property {string} auth.pass - The password for authentication.
 */
const transporter = nodemailer.createTransport({
    service: EMAIL.SMTP_SERVICE,
    host: EMAIL.SMTP_HOST,
    port: EMAIL.SMTP_PORT,
    auth: {
        user: EMAIL.USER,
        pass: EMAIL.PASS
    }
});

// Verifies the connection configuration.
transporter.verify()
.then(() => console.log('Connected to SMTP server successfully.'))
.catch(err => console.error('Error connecting to SMTP server:', err));

module.exports = transporter;