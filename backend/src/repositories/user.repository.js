const User = require('../schemas/user.schema');
const crudRepository = require('./crud.repository');

const userRepository = {
    ...crudRepository(User),
    getUserByEmail: async function (email) {
        const userDoc = await User.findOne({
            email: email
        });
        return userDoc;
    }
}

module.exports = userRepository;