const express = require('express');
const { signupController, signinController, verifyEmailController } = require('../controllers/auth.controller');
const { validateBody } = require('../middlewares/validate');
const {
    signupValidator,
    signinValidator
} = require('../validators/auth.validator');

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

module.exports = authRouter;