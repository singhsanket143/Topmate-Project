const express = require('express');
const { getAllMentorsController, verifyMentorController, getMentorInfoByUserNameController } = require('../controllers/mentor.controller');
const { protect, restrictTo } = require('../middlewares/auth');
const ENUM = require('../utils/constants');

const mentorRouter = express.Router();

// GET /api/v1/mentors
mentorRouter.get('/', getAllMentorsController);

// PUT /api/v1/mentors/:mentorId/verify
mentorRouter.put(
    '/:mentorId/verify', 
    protect, // User should be logged in
    restrictTo(ENUM.ROLE.ADMIN), // Only admin can verify the mentor
    verifyMentorController
);

// GET /api/v1/mentors/username/:username
mentorRouter.get('/username/:username', getMentorInfoByUserNameController)

module.exports = mentorRouter;