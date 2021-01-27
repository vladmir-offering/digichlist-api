const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    first_name: {
        type: String,
        default: '',
    },
    last_name: {
        type: String,
        default: '',
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
        default: false,
    },
});

module.exports = model('User', userSchema);
