const User = require('../models/User');
const error = require('../utils/error-handler.utils');

module.exports.createController = async (req, res) => {
    try {
        const { first_name, last_name, username } = req.body;

        const user = new User({
            first_name,
            last_name,
            username,
            enabled: false,
        });

        await user.save();

        res.status(201).json({
            response: 'ok',
            message: 'New user was successfully created',
            user,
        });
    } catch (e) {
        error(res, e);
    }
};
