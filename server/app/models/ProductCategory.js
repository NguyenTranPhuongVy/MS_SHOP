const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductCate = new Schema({
    idProduct: {
        type: String,
        required: true
    },
    idCategory: {
        type: String,
        required: true
    },
    dateCreate: {
        type: Date,
        required: true,
        default: Date.now
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    },
});

module.exports = mongoose.model("categoryproducts", ProductCate);