const { z } = require('zod');
const mongoose = require('mongoose');
const ENUM = require('../utils/constants');

const signupValidator = z.object({
    email: z
        .string({ 
            message: 'Email should be a valid String' 
        })
        .email({ 
            message: 'Email should be a valid email' 
        }),
    password: z
        .string({
            message: 'Password should be a valid String'
        })
        .min(6, {
            message: 'Password should have at least 6 characters'
        }),
    username: z
        .string({
            message: 'Username should be a valid String'
        })
        .min(3, {
            message: 'Username should have at least 3 characters'
        }),
    profile: z.object({
        title: z.string({ message: "Title can be only a string" }).optional(),
        bio: z.string({ message: "Bio can be only a string" }).optional(),
        college: z.string({ message: "College can be only a string" }).optional(),
        tags: z.array(z.string()).optional(),
        social: z.object({
            linkedin: z.string({ message: "LinkedIn can be only a string" }).optional(),
            github: z.string({ message: "Github can be only a string" }).optional(),
            twitter: z.string({ message: "Twitter can be only a string" }).optional(),
            youtube: z.string({ message: "Youtube can be only a string" }).optional(),
            instagram: z.string({ message: "Instagram can be only a string" }).optional(),
        }).optional()
    }).optional()
});

const signinValidator = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

const changeUserRoleValidator = z.object({
    userId: z.string({
        message: "User id to be updated is missing from the request",
    }).refine((id) => mongoose.Types.ObjectId.isValid(id), {
            message: "Invalid user id passed in the params"
    }),
    role: z
        .string({ message: "Role to be updated is missing from the request" })
        .refine((role) => [ENUM.ROLE.ADMIN, ENUM.ROLE.MENTEE, ENUM.ROLE.MENTOR].includes(role), {
            message: "Invalid role passed in the params"
        })
});

module.exports = {
    signupValidator,
    signinValidator,
    changeUserRoleValidator
}