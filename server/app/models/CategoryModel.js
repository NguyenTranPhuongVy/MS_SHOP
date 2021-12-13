const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Category = new Schema({
    name: {
        type: String,
        required: true,
        maxLength: 200,
        default: ''
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
    view: {
        type: String,
        default: '1'
    },
    type: {
        type: Number,
        required: true
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
        maxLength: 100,
        default: ''
    },
    follow: {
        type: Boolean,
        required: true,
        default: false
    },
    note: {
        type: Boolean,
        required: true,
        default: false
    },
    bin: {
        type: Boolean,
        required: true,
        default: false
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    },
    dateCreate: {
        type: Date,
        default: Date.now,
        required: true
    },
    dateModified: {
        type: Date,
        required: true,
        default: Date.now
    },
    userCreate: {
        type: String,
        default: 'Phuongvy'
    },
    userModified: {
        type: String,
        default: 'Phuongvy'
    },

});

module.exports = mongoose.model("categories", Category);