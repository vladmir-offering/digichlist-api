const { Schema, model } = require('mongoose');

const orderSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    note: {
        type: String,
        default: '',
    },
    quantity: {
        type: Number,
        default: 0,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    user: {
        ref: 'User',
        type: Schema.Types.ObjectId,
    },
    done: {
        type: Boolean,
        default: false,
    },
});

module.exports = model('Order', orderSchema);
