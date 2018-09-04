const mongodb = require('mongoose');

const productSchema = mongodb.Schema({
    _id: mongodb.Schema.Types.ObjectId,
    name: String,
    description: String
})

module.exports = mongodb.model('Product', productSchema);