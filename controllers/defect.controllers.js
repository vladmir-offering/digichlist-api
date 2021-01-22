const Defect = require('../models/Defect');
const User = require('../models/User');
const error = require('../utils/error-handler.utils');

module.exports.createController = async (req, res) => {
    try {
        const { username, title, room, status, open_date, close_date } = req.body;
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
            attachment: req.file ? req.file.path : '',
            user: user._id,
            status,
            open_date: open_date ? open_date : Date.now(),
            close_date: close_date ? close_date : '',
        });

        await defect.save();

        res.status(201).json({
            response: 'ok',
            message: 'New defect was successfully created',
            defect,
        });
    } catch (e) {
        error(res, e);
    }
};

module.exports.updateController = async (req, res) => {
    try {
        const { username, id, status } = req.body;
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

        const defect = await Defect.findById(id);
        defect.status = status;

        const newDefect = await Defect.findOneAndUpdate(
            { _id: id },
            { $set: defect },
            { new: true },
        );

        res.status(201).json({
            response: 'ok',
            message: 'Defect was successfully updated',
            newDefect,
        });
    } catch (e) {
        error(res, e);
    }
};
