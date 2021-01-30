const Defect = require('../models/Defect');
const User = require('../models/User');
const Admin = require('../models/Admin');
const { validationResult } = require('express-validator');
const error = require('../utils/error-handler.utils');

module.exports.getAllController = async (req, res) => {
    try {
        const defects = await Defect.find({});
        res.status(200).json({
            response: 'ok',
            message: defects.length ? 'Defects found' : 'No defects',
            defects,
        });
    } catch (e) {
        error(res, e);
    }
};

module.exports.getByIdController = async (req, res) => {
    try {
        const defect = await Defect.findById(req.params.id);
        res.status(200).json({
            response: 'ok',
            message: defect ? 'Defect found' : 'No defect',
            defect,
        });
    } catch (e) {
        error(res, e);
    }
};

module.exports.getByStatusController = async (req, res) => {
    try {
        const defects = await Defect.find({ status: req.query.status });
        res.status(200).json({
            response: 'ok',
            message: defects.length
                ? 'Defects found by status'
                : 'There are no defects for the specified status',
            defects,
        });
    } catch (e) {
        error(res, e);
    }
};

module.exports.getByDateAndStatusController = async (req, res) => {
    const query = {
        status: req.query.status,
    };

    if (req.query.start) {
        query[req.query.date_type] = {
            $gte: req.query.start,
        };
    }

    if (req.query.end) {
        if (!query[req.query.date_type]) {
            query[req.query.date_type] = {};
        }

        query[req.query.date_type]['$lte'] = req.query.end;
    }

    try {
        const defects = await Defect.find(query).sort({ [req.query.date_type]: -1 });
        res.status(200).json({
            response: 'ok',
            message: defects.length
                ? 'All defects were found according to the specified status and time interval'
                : 'No defects were found for the specified status and time interval',
            defects,
        });
    } catch (e) {
        error(res, e);
    }
};

module.exports.getByUserIdController = async (req, res) => {
    try {
        const defects = await Defect.find({ user: req.params.userId });
        res.status(200).json({
            response: 'ok',
            message: defects.length
                ? 'Defects found by user id'
                : 'No defects were found for this user id',
            defects,
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
            message: 'Incorrect new defect data',
        });
    }

    try {
        const { username, title, room, attachment, attachment_id } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({
                response: 'noUser',
                message:
                    'The user is not in the system. To register a new defect, you must register and gain access.',
            });
        }

        if (user && !user.enabled) {
            return res.status(403).json({
                response: 'noAccess',
                message: 'This user does not have access to the ability to register new defects',
            });
        }

        const defect = new Defect({
            title,
            room,
            attachment,
            attachment_id,
            user: user._id,
        });

        await defect.save();

        res.status(201).json({
            response: 'ok',
            message: defect ? 'New defect was successfully created' : 'Defect not created',
            defect,
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
            message: 'Incorrect defect data',
        });
    }

    try {
        const {
            title,
            room,
            status,
            open_date,
            close_date,
            attachment,
            attachment_id,
            priority,
            close_reason,
            admin_username,
            username,
            comments,
            user,
        } = req.body;

        if (username && user && !admin_username) {
            const repairer = await User.findOne({ username });

            if (!repairer) {
                return res.status(404).json({
                    response: 'noUser',
                    message:
                        'The user is not in the system. To update the defect information, you must register and gain access.',
                });
            }

            if (repairer && repairer.position !== 'Repairer') {
                return res.status(403).json({
                    response: 'notRepairer',
                    message: 'This user is not in a position to update the defect information',
                });
            }

            if (repairer && !repairer.enabled) {
                return res.status(403).json({
                    response: 'noAccess',
                    message: 'This user does not have access to update the defect information',
                });
            }
        }

        if (!username && user && admin_username) {
            const admin = await Admin.findOne({ username: admin_username });

            if (!admin) {
                return res.status(401).json({
                    response: 'noAccess',
                    message: 'This user does not have access to update the defect information',
                });
            }
        }

        const updated = new Defect({
            title,
            room,
            attachment,
            attachment_id,
            user,
            status,
            comments,
            priority,
            close_date,
            close_reason,
            open_date,
            _id: req.params.id,
        });

        const defect = await Defect.findOneAndUpdate(
            { _id: req.params.id },
            { $set: updated },
            { new: true },
        );

        res.status(201).json({
            response: 'ok',
            message: defect ? 'Defect was successfully updated' : 'Defect not updated',
            defect,
        });
    } catch (e) {
        error(res, e);
    }
};

module.exports.removeController = async (req, res) => {
    try {
        await Defect.remove({ _id: req.params.id });
        res.status(200).json({ response: 'ok', message: 'Defect has been deleted' });
    } catch (e) {
        error(res, e);
    }
};

module.exports.removeByDateAndStatusController = async (req, res) => {
    const query = {
        status: req.query.status,
    };

    if (req.query.start) {
        query[req.query.date_type] = {
            $gte: req.query.start,
        };
    }

    if (req.query.end) {
        if (!query[req.query.date_type]) {
            query[req.query.date_type] = {};
        }

        query[req.query.date_type]['$lte'] = req.query.end;
    }

    try {
        await Defect.remove(query);
        res.status(200).json({ response: 'ok', message: 'Defects has been deleted' });
    } catch (e) {
        error(res, e);
    }
};
