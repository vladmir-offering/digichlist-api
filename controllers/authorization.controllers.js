const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const config = require('../config/keys.config');
const error = require('../utils/error-handler.utils');

module.exports.loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await Admin.findOne({ email });

        if (!admin) {
            return res.status(404).json({ message: 'Admin not found. Check input data' });
        }

        const isMatch = await bcrypt.compareSync(password, admin.password);

        if (!isMatch) {
            return res.status(409).json({ message: 'Wrong password. Try again' });
        }

        const token = jwt.sign({ adminId: admin._id, email: admin.email }, config.jwt, {
            expiresIn: '1h',
        });

        res.status(200).json({ token: `Bearer ${token}` });
    } catch (e) {
        error(res, e);
    }
};

module.exports.registrationController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const candidate = await Admin.findOne({ email });

        if (candidate) {
            return res
                .status(409)
                .json({ message: 'This email is already in use. Enter another email' });
        }

        const hashedPassword = await bcrypt.hashSync(password, 12);
        const admin = new Admin({ email, password: hashedPassword });

        await admin.save();

        res.status(201).json({ message: 'Admin successfully created' });
    } catch (e) {
        error(res, e);
    }
};
