const serviceRepository = require("../repositories/service.repository")

const createService = async (serviceData) => {
    const newService = await serviceRepository.create(serviceData);
    return newService;
}

module.exports = {
    createService
}