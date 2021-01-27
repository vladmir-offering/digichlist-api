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
        default: '',
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
        default: '',
    },
});

module.exports = model('Defect', defectSchema);
