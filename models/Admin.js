const { Schema, model } = require('mongoose');
const shortid = require('shortid');

const adminSchema = new Schema({
    _id: {
        type: String,
        default: shortid.generate,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

module.exports = model('Admin', adminSchema);
