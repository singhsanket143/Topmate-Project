function crudRepository(model) {
    return {
        create: async function createDoc(data) {
            const newDoc = new model(data);
            await newDoc.save();
            return newDoc;
        },
        getAll: async function getAllDocs() {
            return await model.find();
        },
        getById: async function getDoc(id) {
            return await model.findById(id);
        },
        delete: async function deleteDoc(id) {
            return await model.findByIdAndDelete(id);
        },
        deleteMany: async function deleteManyDocs(ids) {
            const response = await model.deleteMany({
                _id: {
                    $in: ids
                }
            });
            return response;
        },
        update: async function updateDocs(id, data) {
            const response = await model.findByIdAndUpdate(id, data, {
                new: true
            });
            return response;
        }
    }
}

module.exports = crudRepository;