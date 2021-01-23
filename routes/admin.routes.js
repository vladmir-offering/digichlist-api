const { Router } = require('express');
const passport = require('passport');
const adminControllers = require('../controllers/admin.controllers');
const router = Router();

router.patch(
    '/update/:id',
    passport.authenticate('jwt', { session: false }),
    adminControllers.updateController,
);
router.get(
    '/all',
    passport.authenticate('jwt', { session: false }),
    adminControllers.getAllController,
);
router.get(
    '/getById/:id',
    passport.authenticate('jwt', { session: false }),
    adminControllers.getByIdController,
);
router.post(
    '/registration',
    passport.authenticate('jwt', { session: false }),
    adminControllers.registrationController,
);
router.delete(
    '/delete/:id',
    passport.authenticate('jwt', { session: false }),
    adminControllers.removeController,
);

module.exports = router;
