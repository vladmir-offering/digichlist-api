const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    first_name: {
        type: String,
        default: '',
    },
    last_name: {
        type: String,
        default: 'Last name is missing',
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    position: {
        type: String,
        enum: ['Cleaner', 'Repairer', 'Merchandiser', 'None'],
        default: 'None',
    },
    chat_id: {
        type: String,
        required: true,
        unique: true,
    },
    enabled: {
        type: Boolean,
        default: false,
    },
});

module.exports = model('User', userSchema);
