const express = require('express');
const { protect, restrictTo } = require('../middlewares/auth');
const ENUM = require('../utils/constants');
const { createAvailabilityController } = require('../controllers/availability.controller');
const { createAvailabilityValidator } = require('../validators/availability.validator');
const { validateBody } = require('../middlewares/validate');

const availabilityRouter = express.Router();

// POST /api/v1/availabilities/mentors
availabilityRouter.post(
    '/mentors',
    protect,
    restrictTo(ENUM.ROLE.MENTOR),
    validateBody(createAvailabilityValidator),
    createAvailabilityController
)

module.exports = availabilityRouter;