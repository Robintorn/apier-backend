const mongodb = require('mongoose');

const productSchema = mongodb.Schema({
    _id: mongodb.Schema.Types.ObjectId,
    name: { type: String, required: true },
    description: { type: String, required: true },
    samarbetspartner: { type: String, required: true },
    sektion: String,
    top: String,
    left: String,
    productImage: { type: String, required: true },
    editPosition: false,
    editProperties: false
})

module.exports = mongodb.model('Product', productSchema);