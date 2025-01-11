const express = require('express');
const { protect, restrictTo } = require('../middlewares/auth');
const ENUM = require('../utils/constants');
const { createAvailabilityController, getAvailabilityController } = require('../controllers/availability.controller');
const { createAvailabilityValidator } = require('../validators/availability.validator');
const { validateBody, validateParams } = require('../middlewares/validate');
const { mentorIdValidator } = require('../validators/user.validator');

const availabilityRouter = express.Router();

// POST /api/v1/availabilities/mentors
availabilityRouter.post(
    '/mentors',
    protect,
    restrictTo(ENUM.ROLE.MENTOR),
    validateBody(createAvailabilityValidator),
    createAvailabilityController
);

// GET /api/v1/mentors/availability/:mentorId
availabilityRouter.get(
    '/mentors/:mentorId', 
    protect,
    validateParams(mentorIdValidator),
    getAvailabilityController
);

module.exports = availabilityRouter;