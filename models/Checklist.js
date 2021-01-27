const { Schema, model } = require('mongoose');

const checklistSchema = new Schema({
    checklist: {
        type: Number,
        required: true,
    },
    note: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    user: {
        ref: 'User',
        type: Schema.Types.ObjectId,
    },
    list: [
        {
            name: {
                type: String,
            },
            quantity: {
                type: Number,
            },
        },
    ],
    done: {
        type: Boolean,
        default: false,
    },
});

module.exports = model('Checklist', checklistSchema);
