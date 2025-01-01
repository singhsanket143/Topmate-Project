const express = require('express');
const { signupController, signinController, verifyEmailController, changeUserRoleController } = require('../controllers/auth.controller');
const { validateBody } = require('../middlewares/validate');
const {
    signupValidator,
    signinValidator,
    changeUserRoleValidator
} = require('../validators/auth.validator');
const { protect, restrictTo } = require('../middlewares/auth');
const ENUM = require('../utils/constants');

const authRouter = express.Router();

authRouter.post(
    '/signup',
    validateBody(signupValidator),
    signupController,
);

authRouter.post(
    '/signin', 
    validateBody(signinValidator),
    signinController
);

authRouter.get('/verifyEmail/:verificationToken', verifyEmailController);

authRouter.put(
    '/role', 
    protect, // If the user is signed in, then only he can change the role
    restrictTo(ENUM.ROLE.ADMIN), // Only admin can change the role
    validateBody(changeUserRoleValidator),
    changeUserRoleController
);

module.exports = authRouter;