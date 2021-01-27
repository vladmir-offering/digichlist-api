const Checklist = require('../models/Checklist');
const User = require('../models/User');
const { validationResult } = require('express-validator');
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

        if (req.query.checklist) {
            query.checklist = +req.query.checklist;
        }

        const checklists = await Checklist.find(query).sort({ date: -1 });
        res.status(200).json({
            response: 'ok',
            message: checklists.length ? 'Checklists found' : 'No checklists',
            checklists,
        });
    } catch (e) {
        error(res, e);
    }
};

module.exports.getByIdController = async (req, res) => {
    try {
        const checklist = await Checklist.findById(req.params.id);
        res.status(200).json({
            response: 'ok',
            message: checklist.length ? 'Checklist found' : 'No checklist',
            checklist,
        });
    } catch (e) {
        error(res, e);
    }
};

module.exports.getByUserController = async (req, res) => {
    try {
        const checklists = await Checklist.find({ user: req.params.userId });
        res.status(200).json({
            response: 'ok',
            message: checklists.length
                ? 'Checklists found by user id'
                : 'No checklists were found for this user id',
            checklists,
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
            message: 'Incorrect new checklist data',
        });
    }

    try {
        const { username, list } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({
                response: 'noUser',
                message:
                    'The user is not in the system. To register a new checklist, you must register and gain access.',
            });
        }

        if (user && !user.enabled) {
            return res.status(403).json({
                response: 'noAccess',
                message: 'This user does not have access to the ability to register new checklist',
            });
        }

        const lastChecklist = await Checklist.findOne({ user: user._id }).sort({ date: -1 });
        const maxChecklist = lastChecklist ? lastChecklist.checklist : 0;

        const checklist = new Checklist({
            checklist: maxChecklist + 1,
            user: user._id,
            list,
        });

        await checklist.save();

        res.status(201).json({
            response: 'ok',
            message: checklist ? 'New checklist was successfully created' : 'Checklist not created',
            checklist,
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
            message: 'Incorrect checklist data',
        });
    }

    try {
        const { user, checklist, note, list, done } = req.body;

        const updated = new Checklist({
            user,
            checklist,
            note,
            list,
            done,
            _id: req.params.id,
        });

        const newChecklist = await Checklist.findOneAndUpdate(
            { _id: req.params.id },
            { $set: updated },
            { new: true },
        );

        res.status(201).json({
            response: 'ok',
            message: newChecklist ? 'Checklist was successfully updated' : 'Checklist not updated',
            newChecklist,
        });
    } catch (e) {
        error(res, e);
    }
};

module.exports.removeController = async (req, res) => {
    try {
        await Checklist.remove({ _id: req.params.id });
        res.status(200).json({ response: 'ok', message: 'Checklist has been deleted' });
    } catch (e) {
        error(res, e);
    }
};
