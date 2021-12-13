const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = new Schema({
    name: {
        type: String,
        required: true,
        maxLength: 200
    },
    image: {
        type: String,
        default: 'no-imgae.png'
    },
    code: {
        type: String,
        maxLength: 50,
        default: ''
    },
    price: {
        type: Number,
        default: 0
    },
    view: {
        type: Number,
        default: 1
    },
    describe: {
        type: String,
        maxLength: 500,
        default: ''
    },
    content: {
        type: String,
        default: ''
    },
    password: {
        type: String,
        default: ''
    },
    percentDiscount: {
        type: Number,
        default: 0
    },
    follow: {
        type: Boolean,
        default: false
    },
    note: {
        type: Boolean,
        default: false
    },
    bin: {
        type: Boolean,
        default: false
    },
    active: {
        type: Boolean,
        default: true
    },
    dateCreate: {
        type: Date,
        required: true,
        default: Date.now
    },
    dateModified: {
        type: Date,
        required: true,
        default: Date.now
    },
    userCreate: {
        type: String,
        default: 'PhuongVy'
    },
    userModified: {
        type: String,
        default: 'PhuongVy'
    },
});

module.exports = mongoose.model('products', Product);