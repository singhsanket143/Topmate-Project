const { z } = require("zod");
const mongoose = require("mongoose");

const getUserDetailsValidator = z.object({
    userId: z.string().refine((id) => mongoose.Types.ObjectId.isValid(id), {
        message: "Invalid user id passed in the params"
    })
});

const mentorIdValidator = z.object({
    mentorId: z.string().refine((id) => mongoose.Types.ObjectId.isValid(id), {
        message: "Invalid mentor id passed in the params"
    })
})

module.exports = {
    mentorIdValidator,
    getUserDetailsValidator
}