const { z } = require('zod');
const { timeParser } = require('../utils/timeParser');
const { differenceInMinutes } = require('date-fns');

const dayAvailabilitySchema = z.object({
    startTime: z.string({ message: "Start time is required for adding an availability slot" }),
    endTime: z.string({ message: "End time is required for adding an availability slot" })
}).refine((data) => {
    const startValue = timeParser(data.startTime);
    const endValue = timeParser(data.endTime);

    // Ensure start time is before the end time
    if(startValue >= endValue) {
        return false
    }

    // Check the difference in minutes
    const diffInMinutes = differenceInMinutes(endValue, startValue);
    console.log(startValue, endValue, diffInMinutes);
    return [30, 45, 60].includes(diffInMinutes);
        
}, {
    message: "The time gap between start time and endtime must be 30, 45 or 60 minutes"
})

const createAvailabilityValidator = z.object({
    unavailableDates: z.array(z.object({
        date: z.string({ message: "Unavailable date should be a valid date "})
    })).optional(),
    weekAvailability: z.object({
        monday: z.array(dayAvailabilitySchema).optional(),
        tuesday: z.array(dayAvailabilitySchema).optional(),
        wednesday: z.array(dayAvailabilitySchema).optional(),
        thursday: z.array(dayAvailabilitySchema).optional(),
        friday: z.array(dayAvailabilitySchema).optional(),
        saturday: z.array(dayAvailabilitySchema).optional(),
        sunday: z.array(dayAvailabilitySchema).optional()
    })
});

module.exports = {
    createAvailabilityValidator
}