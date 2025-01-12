const express = require('express');
const { createServiceController, getServiceByIdController, getAllServicesController, getServicesByMentorIdController, updateServiceController } = require('../controllers/service.controller');
const { protect, restrictTo } = require('../middlewares/auth');
const ENUM = require('../utils/constants');
const { validateBody, validateParams } = require("../middlewares/validate");
const { createServiceValidatorSchema, getServiceByIdSchema, getServiceByMentorIdSchema, updateServiceSchema } = require('../validators/service.validator');

const serviceRouter = express.Router();

serviceRouter.post(
    '/', 
    protect,
    restrictTo(ENUM.ROLE.MENTOR, ENUM.ROLE.ADMIN),
    validateBody(createServiceValidatorSchema),
    createServiceController
);

serviceRouter.get(
    '/:serviceId',
    validateParams(getServiceByIdSchema),
    getServiceByIdController
);

serviceRouter.get(
    '/mentor/:mentorId',
    validateParams(getServiceByMentorIdSchema),
    getServicesByMentorIdController
);

serviceRouter.get('/', getAllServicesController);

serviceRouter.put(
    '/:serviceId',
    protect,
    validateParams(getServiceByIdSchema),
    validateBody(updateServiceSchema),
    updateServiceController
);

module.exports = serviceRouter;