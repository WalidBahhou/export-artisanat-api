const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    productFamily: {
        type: String,
        required: true
    }
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product