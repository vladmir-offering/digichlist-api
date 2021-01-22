const error = require('../utils/error-handler.utils');

module.exports.welcome = async (req, res) => {
    try {
        res.status(200).json({ message: 'Welcome to digichlist API' });
    } catch (e) {
        error(res, e);
    }
};
