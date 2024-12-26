const { z } = require("zod");
const mongoose = require("mongoose");

const getUserDetailsValidator = z.object({
    userId: z.string().refine((id) => mongoose.Types.ObjectId.isValid(id), {
        message: "Invalid user id passed in the params"
    })
});

module.exports = {
    getUserDetailsValidator
}