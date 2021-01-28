const Order = require('../models/Order');
const User = require('../models/User');
const error = require('../utils/error-handler.utils');

module.exports.getAllController = async (req, res) => {
    try {
        const query = {};

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
            message: order.length ? 'Order found' : 'No order',
            order,
        });
    } catch (e) {
        error(res, e);
    }
};

module.exports.getByUserController = async (req, res) => {
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

module.exports.createController = async (req, res) => {
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
    try {
        const { title, note, quantity, date, user, done } = req.body;

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
