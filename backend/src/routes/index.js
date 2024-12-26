const express = require('express'); // Import express
const authRouter = require('./auth.routes'); // Import auth.routes
const userRouter = require('./user.routes');

const router = express.Router(); // Create a router

router.use('/auth', authRouter); // Use authRouter for /auth path
router.use('/users', userRouter); // Use userRouter for /users path

module.exports = router; // Export router