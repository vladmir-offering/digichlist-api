const rateLimit = require('express-rate-limit');
const MongoStore = require('rate-limit-mongo');
const config = require('../config/keys.config');

module.exports.limiter = rateLimit({
    store: new MongoStore({
        uri: config.mongoURI,
    }),
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests',
});
