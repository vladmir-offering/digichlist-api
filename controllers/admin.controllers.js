const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');
const { validationResult } = require('express-validator');
const error = require('../utils/error-handler.utils');

async function checkIsPasswordNew(req) {
    const { password, changed } = req.body;
    if (changed) {
        return bcrypt.hashSync(password, 12);
    } else {
        return password;
    }
}

module.exports.getAllController = async (req, res) => {
    try {
        const admins = await Admin.find({});
        res.status(200).json({
            response: 'ok',
            message: admins.length ? 'Admins found' : 'No admins',
            admins,
        });
    } catch (e) {
        error(res, e);
    }
};

module.exports.getByUsernameController = async (req, res) => {
    try {
        const admin = await Admin.findOne({ username: req.params.username.toString() });
        res.status(200).json({
            response: 'ok',
            message: admin ? 'Admin found' : 'No admin',
            admin,
        });
    } catch (e) {
        error(res, e);
    }
};

module.exports.getByIdController = async (req, res) => {
    try {
        const admin = await Admin.findById(req.params.id);
        res.status(200).json({
            response: 'ok',
            message: admin ? 'Admin found' : 'No admin',
            admin,
        });
    } catch (e) {
        error(res, e);
    }
};

module.exports.registrationController = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
            message: 'Incorrect registration information',
        });
    }

    try {
        const { email, password, username } = req.body;
        const candidateEmail = await Admin.findOne({ email });
        const candidateUsername = await Admin.findOne({ username });

        if (candidateEmail) {
            return res
                .status(409)
                .json({ message: 'This email is already in use. Enter another email' });
        }

        if (candidateUsername) {
            return res
                .status(409)
                .json({ message: 'This username is already in use. Enter another username' });
        }

        const hashedPassword = await bcrypt.hashSync(password, 12);
        const admin = new Admin({ email, password: hashedPassword, username });

        await admin.save();

        res.status(201).json({
            response: 'ok',
            message: admin ? 'Admin successfully created' : 'Admin not created',
            admin,
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
            message: 'Incorrect admin data',
        });
    }

    try {
        const password = await checkIsPasswordNew(req);

        const updated = new Admin({
            email: req.body.email,
            password,
            username: req.body.username,
            _id: req.params.id,
        });

        const admin = await Admin.findOneAndUpdate(
            { _id: req.params.id },
            { $set: updated },
            { new: true },
        );

        res.status(201).json({
            response: 'ok',
            message: admin ? 'Admin was successfully updated' : 'Admin not updated',
            admin,
        });
    } catch (e) {
        error(res, e);
    }
};

module.exports.removeController = async (req, res) => {
    try {
        await Admin.remove({ _id: req.params.id });
        res.status(200).json({ response: 'ok', message: 'Admin has been deleted' });
    } catch (e) {
        error(res, e);
    }
};
