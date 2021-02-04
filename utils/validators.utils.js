const { body } = require('express-validator');

exports.loginValidators = [
    body('email')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Enter correct email')
        .isString()
        .withMessage('Email must be type string')
        .matches(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        )
        .withMessage('Not correct email regex!')
        .normalizeEmail()
        .trim(),
    body('password')
        .notEmpty()
        .withMessage('Password is required')
        .isString()
        .withMessage('Password must be type string')
        .isLength({ min: 8 })
        .withMessage('Not correct password. Minimum length 8 symbols')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
        .withMessage('Not correct password regex')
        .trim(),
];

exports.registrationCreateValidators = [
    body('email')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Enter correct email')
        .isString()
        .withMessage('Email must be type string')
        .matches(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        )
        .withMessage('Not correct email regex!')
        .normalizeEmail()
        .trim(),
    body('username')
        .notEmpty()
        .withMessage('Username is required')
        .isString()
        .withMessage('Username must be type string')
        .isLength({ min: 5, max: 25 })
        .withMessage('Not correct username. Minimum length 5 symbols. Max - 25')
        .matches(/^(?=[a-zA-Z0-9._]{6,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/)
        .withMessage('Not correct username regex')
        .trim(),
    body('password')
        .notEmpty()
        .withMessage('Password is required')
        .isString()
        .withMessage('Password must be type string')
        .isLength({ min: 8 })
        .withMessage('Not correct password. Minimum length 8 symbols')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
        .withMessage('Not correct password regex')
        .trim(),
];

exports.registrationUpdateValidators = [
    body('email')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Enter correct email')
        .isString()
        .withMessage('Email must be type string')
        .matches(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        )
        .withMessage('Not correct email regex!')
        .normalizeEmail()
        .trim(),
    body('username')
        .notEmpty()
        .withMessage('Username is required')
        .isString()
        .withMessage('Username must be type string')
        .isLength({ min: 5, max: 25 })
        .withMessage('Not correct username. Minimum length 5 symbols. Max - 25')
        .matches(/^(?=[a-zA-Z0-9._]{6,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/)
        .withMessage('Not correct username regex')
        .trim(),
    body('password')
        .notEmpty()
        .withMessage('Password is required')
        .isString()
        .withMessage('Password must be type string')
        .isLength({ min: 8 })
        .withMessage('Not correct password. Minimum length 8 symbols')
        .trim(),
];

exports.userCreateValidators = [
    body('first_name')
        .isString()
        .withMessage('First name must be type string')
        .isLength({ min: 1, max: 25 })
        .withMessage('Min first name length is 1 symbols. Max - 25 symbols')
        .trim(),
    body('username')
        .notEmpty()
        .withMessage('Username is required')
        .isString()
        .withMessage('Username must be type string')
        .isLength({ min: 5, max: 15 })
        .withMessage('Min username length is 5 symbols. Max - 15 symbols')
        .trim(),
    body('chat_id')
        .notEmpty()
        .withMessage('Chat id is required')
        .isString()
        .withMessage('Chat id must be type string')
        .isLength({ min: 5, max: 15 })
        .withMessage('Min chat id length is 5 symbols. Max - 15 symbols')
        .trim(),
];

exports.userUpdateValidators = [
    body('first_name')
        .isString()
        .withMessage('First name must be type string')
        .isLength({ min: 1, max: 25 })
        .withMessage('Min first name length is 1 symbols. Max - 25 symbols')
        .trim(),
    body('username')
        .notEmpty()
        .withMessage('Username is required')
        .isString()
        .withMessage('Username must be type string')
        .isLength({ min: 5, max: 15 })
        .withMessage('Min username length is 5 symbols. Max - 15 symbols')
        .trim(),
    body('last_name')
        .isString()
        .withMessage('Last name must be type string')
        .isLength({ min: 1, max: 30 })
        .withMessage('Min last name length is 1 symbols. Max - 30 symbols')
        .trim(),
    body('chat_id')
        .notEmpty()
        .withMessage('Username is required')
        .isString()
        .withMessage('Username must be type string')
        .isLength({ min: 5, max: 15 })
        .withMessage('Min chat id length is 5 symbols. Max - 15 symbols')
        .trim(),
    body('enabled').isBoolean().withMessage('Enabled must be boolean type').trim(),
    body('position')
        .notEmpty()
        .withMessage('Position is required')
        .isString()
        .withMessage('Position must be type string')
        .trim(),
];

exports.defectCreateValidators = [
    body('title')
        .notEmpty()
        .withMessage('Title is required')
        .isString()
        .withMessage('Title must be type string')
        .isLength({ min: 5 })
        .withMessage('Min title length is 5 symbols.')
        .trim(),
    body('room')
        .notEmpty()
        .withMessage('Room is required')
        .isString()
        .withMessage('Room must be type string')
        .isLength({ min: 1, max: 20 })
        .withMessage('Min room length is 1 symbols. Max - 20 symbols')
        .trim(),
];

exports.defectUpdateValidators = [
    body('title')
        .notEmpty()
        .withMessage('Title is required')
        .isString()
        .withMessage('Title must be type string')
        .isLength({ min: 5 })
        .withMessage('Min title length is 5 symbols')
        .trim(),
    body('room')
        .notEmpty()
        .withMessage('Room is required')
        .isString()
        .withMessage('Room must be type string')
        .isLength({ min: 1, max: 20 })
        .withMessage('Min room length is 1 symbols. Max - 20 symbols')
        .trim(),
    body('status').isString().withMessage('Status must be type string').trim(),
    body('open_date')
        .matches(
            /^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/,
        )
        .withMessage('Date must be in format 2021-01-01 00:00:00')
        .trim(),
    body('close_reason')
        .isString()
        .withMessage('Close reason must be type string')
        .isLength({ min: 5 })
        .withMessage('Min room length is 5 symbols')
        .trim(),
    body('priority').isNumeric().withMessage('Priority must be type number').trim(),
];

exports.orderCreateValidators = [
    body('title')
        .notEmpty()
        .withMessage('Title is required')
        .isString()
        .withMessage('Title must be type string')
        .isLength({ min: 3 })
        .withMessage('Min title length is 3 symbols')
        .trim(),
    body('note')
        .isString()
        .withMessage('Note must be type string')
        .isLength({ min: 5 })
        .withMessage('Min note length is 5 symbols')
        .trim(),
    body('quantity').isNumeric().withMessage('Quantity must be type number').trim(),
];

exports.orderUpdateValidators = [
    body('title')
        .notEmpty()
        .withMessage('Title is required')
        .isString()
        .withMessage('Title must be type string')
        .isLength({ min: 3 })
        .withMessage('Min title length is 3 symbols')
        .trim(),
    body('note')
        .isString()
        .withMessage('Note must be type string')
        .isLength({ min: 5 })
        .withMessage('Min note length is 5 symbols')
        .trim(),
    body('quantity').isNumeric().withMessage('Quantity must be type number').trim(),
    body('date')
        .matches(
            /^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/,
        )
        .withMessage('Date must be in format 2021-01-01 00:00:00')
        .trim(),
    body('done').isBoolean().withMessage('Done must be boolean type').trim(),
];
