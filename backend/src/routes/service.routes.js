const express = require('express');
const { createServiceController } = require('../controllers/service.controller');
const { protect, restrictTo } = require('../middlewares/auth');
const ENUM = require('../utils/constants');
const { validateBody } = require("../middlewares/validate");
const { createServiceValidatorSchema } = require('../validators/service.validator');

const serviceRouter = express.Router();

serviceRouter.post(
    '/', 
    protect,
    restrictTo(ENUM.ROLE.MENTOR, ENUM.ROLE.ADMIN),
    validateBody(createServiceValidatorSchema),
    createServiceController
);

module.exports = serviceRouter;