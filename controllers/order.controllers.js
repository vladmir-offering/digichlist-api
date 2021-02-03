const Order = require('../models/Order');
const User = require('../models/User');
const Admin = require('../models/Admin');
const { validationResult } = require('express-validator');
const error = require('../utils/error-handler.utils');

module.exports.getAllController = async (req, res) => {
    try {
        const orders = await Order.find({});
        res.status(200).json({
            response: 'ok',
            message: orders.length ? 'Orders found' : 'No orders',
            orders,
        });
    } catch (e) {
        error(res, e);
    }
};

module.exports.getByDateAndDoneController = async (req, res) => {
    try {
        const query = {
            done: req.query.done,
        };

        if (req.query.start) {
            query.date = {
                $gte: req.query.start,
            };
        }

        if (req.query.end) {
            if (!query.date) {
                query.date = {};
            }

            query.date['$lte'] = req.query.end;
        }

        const orders = await Order.find(query).sort({ date: -1 });
        res.status(200).json({
            response: 'ok',
            message: orders.length ? 'Orders found' : 'No orders',
            orders,
        });
    } catch (e) {
        error(res, e);
    }
};

module.exports.getByIdController = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        res.status(200).json({
            response: 'ok',
            message: order ? 'Order found' : 'No order',
            order,
        });
    } catch (e) {
        error(res, e);
    }
};

module.exports.getByDoneController = async (req, res) => {
    try {
        const orders = await Order.find({ done: req.query.done });
        res.status(200).json({
            response: 'ok',
            message: orders.length ? 'Orders found' : 'No orders',
            orders,
        });
    } catch (e) {
        error(res, e);
    }
};

module.exports.getByUserIdController = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.params.userId });
        res.status(200).json({
            response: 'ok',
            message: orders.length
                ? 'Orders found by user id'
                : 'No orders were found for this user id',
            orders,
        });
    } catch (e) {
        error(res, e);
    }
};

module.exports.getByUsernameController = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        const orders = await Order.find({ user: user._id });
        res.status(200).json({
            response: 'ok',
            message: orders.length
                ? 'Orders found by username'
                : 'No orders were found for this username',
            orders,
        });
    } catch (e) {
        error(res, e);
    }
};

module.exports.createController = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
            message: 'Incorrect new order data',
        });
    }

    try {
        const { username, title, note, quantity } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({
                response: 'noUser',
                message:
                    'The user is not in the system. To register a new order, you must register and gain access.',
            });
        }

        if (user && !user.enabled) {
            return res.status(403).json({
                response: 'noAccess',
                message: 'This user does not have access to the ability to register new order',
            });
        }

        const order = new Order({
            title,
            note,
            quantity,
            user: user._id,
        });

        await order.save();

        res.status(201).json({
            response: 'ok',
            message: order ? 'New order was successfully created' : 'Order not created',
            order,
        });
    } catch (e) {
        error(res, e);
    }
};

module.exports.updateController = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
            message: 'Incorrect new order data',
        });
    }

    try {
        const { title, note, quantity, date, user, done, admin_username, username } = req.body;

        if (username && user && !admin_username) {
            const merchandiser = await User.findOne({ username });

            if (!merchandiser) {
                return res.status(404).json({
                    response: 'noUser',
                    message:
                        'The user is not in the system. To update the order information, you must register and gain access.',
                });
            }

            if (merchandiser && merchandiser.position !== 'Merchandiser') {
                return res.status(403).json({
                    response: 'notRepairer',
                    message: 'This user is not in a position to update the order information',
                });
            }

            if (merchandiser && !merchandiser.enabled) {
                return res.status(403).json({
                    response: 'noAccess',
                    message: 'This user does not have access to update the order information',
                });
            }
        }

        if (!username && user && admin_username) {
            const admin = await Admin.findOne({ username: admin_username });

            if (!admin) {
                return res.status(401).json({
                    response: 'noAccess',
                    message: 'This user does not have access to update the order information',
                });
            }
        }

        const updated = new Order({
            user,
            title,
            note,
            quantity,
            date,
            done,
            _id: req.params.id,
        });

        const order = await Order.findOneAndUpdate(
            { _id: req.params.id },
            { $set: updated },
            { new: true },
        );

        res.status(201).json({
            response: 'ok',
            message: order ? 'Order was successfully updated' : 'Order not updated',
            order,
        });
    } catch (e) {
        error(res, e);
    }
};

module.exports.removeController = async (req, res) => {
    try {
        await Order.remove({ _id: req.params.id });
        res.status(200).json({ response: 'ok', message: 'Order has been deleted' });
    } catch (e) {
        error(res, e);
    }
};

module.exports.removeDoneByDateController = async (req, res) => {
    const query = {
        done: true,
    };

    if (req.query.start) {
        query.date = {
            $gte: req.query.start,
        };
    }

    if (req.query.end) {
        if (!query.date) {
            query.date = {};
        }

        query.date['$lte'] = req.query.end;
    }

    try {
        await Order.remove(query);
        res.status(200).json({ response: 'ok', message: 'Orders has been deleted' });
    } catch (e) {
        error(res, e);
    }
};
