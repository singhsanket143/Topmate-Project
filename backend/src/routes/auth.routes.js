const express = require('express');
const { signupController, signinController, verifyEmailController } = require('../controllers/auth.controller');
const validate = require('../middlewares/validate');
const {
    signupValidator,
    signinValidator
} = require('../validators/auth.validator');

const authRouter = express.Router();

authRouter.post(
    '/signup',
    validate(signupValidator),
    signupController,
);

authRouter.post(
    '/signin', 
    validate(signinValidator),
    signinController
);

authRouter.get('/verifyEmail/:verificationToken', verifyEmailController);

module.exports = authRouter;