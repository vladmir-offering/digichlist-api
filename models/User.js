const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    position: {
        type: String,
        enum: ['Cleaner', 'Repairer', 'None'],
        default: 'None',
    },
    chat_id: {
        type: String,
        required: true,
    },
    enabled: {
        type: Boolean,
        required: true,
        default: false,
    },
});

module.exports = model('User', userSchema);
