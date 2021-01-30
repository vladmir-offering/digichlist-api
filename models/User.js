const { Schema, model } = require('mongoose');
const shortid = require('shortid');

const userSchema = new Schema({
    _id: {
        type: String,
        default: shortid.generate,
    },
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
