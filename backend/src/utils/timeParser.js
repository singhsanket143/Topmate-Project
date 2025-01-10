const { parse } = require("date-fns")

const timeParser = (timeStr) => {
    const parsedDate = parse(timeStr, "hh:mm a", new Date());
    if(isNaN(parsedDate)) {
        throw new Error('Invalid time format')
    }
    return parsedDate;
}

module.exports = {
    timeParser
}