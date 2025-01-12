const mongoose = require('mongoose');
const { z } = require('zod');

const createServiceValidatorSchema = z.object({
    name: z.string({ message: "Name is required to create a service" })
            .min(5, { message: "Name must contain at least 5 character(s)" })
            .max(255, { message: "Name must contain at most 255 character(s)" }),
    description: z.string({ message: "Description is required to create a service" })
                  .min(5, { message: "Description must contain at least 5 character(s)" }),
    price: z.number({ message: "Price is required to create a service" })
            .min(1, { message: "Price should be atleast 1" }),
    duration: z.number({ message: "Duration is required to create a service"}).multipleOf(15, {
        message: "Duration must be a multiple of 15"
    }).min(15, { message: "Duration must contain at least 15 mins" }),
    active: z.boolean().optional()
});

const getServiceByIdSchema = z.object({
    serviceId: z.string().refine((id) => mongoose.Types.ObjectId.isValid(id), {
            message: "Invalid service id passed in the params"
        })
})

module.exports = {
    createServiceValidatorSchema,
    getServiceByIdSchema
}