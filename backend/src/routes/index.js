const express = require('express'); // Import express
const authRouter = require('./auth.routes'); // Import auth.routes

const router = express.Router(); // Create a router

router.use('/auth', authRouter); // Use authRouter for /auth path

module.exports = router; // Export router