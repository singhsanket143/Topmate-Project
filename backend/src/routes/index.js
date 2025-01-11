const express = require('express'); // Import express
const authRouter = require('./auth.routes'); // Import auth.routes
const userRouter = require('./user.routes');
const mentorRouter = require('./mentor.routes');
const availabilityRouter = require('./availability.routes');
const serviceRouter = require('./service.routes');

const router = express.Router(); // Create a router

router.use('/auth', authRouter); // Use authRouter for /auth path
router.use('/users', userRouter); // Use userRouter for /users path
router.use('/mentors', mentorRouter); // Use mentorRouter for /mentors path
router.use('/availabilities', availabilityRouter); // Use availabilityRouter for /availabilities path
router.use('/services', serviceRouter); // Use serviceRouter for /services path

module.exports = router; // Export router