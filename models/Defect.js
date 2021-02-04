const { Schema, model } = require('mongoose');

const defectSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    room: {
        type: String,
        required: true,
    },
    comments: [
        {
            user: {
                ref: 'User',
                type: Schema.Types.ObjectId,
            },
            username: {
                type: String,
                required: true,
                default: '',
            },
            message: {
                type: String,
                required: true,
                default: '',
            },
        },
    ],
    attachment: {
        type: String,
        default: '',
    },
    attachment_id: {
        type: String,
        default: '',
    },
    user: {
        ref: 'User',
        type: Schema.Types.ObjectId,
    },
    status: {
        type: String,
        enum: ['open', 'fixing', 'solved'],
        default: 'open',
    },
    close_reason: {
        type: String,
        default: 'Defect not yet fixed',
    },
    priority: {
        type: Number,
        default: 4,
        min: 1,
        max: 4,
    },
    open_date: {
        type: Date,
        default: Date.now,
    },
    close_date: {
        type: Date,
    },
});

module.exports = model('Defect', defectSchema);
