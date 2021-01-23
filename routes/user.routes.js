const { Router } = require('express');
const passport = require('passport');
const userControllers = require('../controllers/user.controllers');
const router = Router();

router.post('/create', userControllers.createController);
router.get(
    '/all',
    passport.authenticate('jwt', { session: false }),
    userControllers.getAllController,
);
router.get('/getByUsername/:username', userControllers.getByUsernameController);
router.get(
    '/getById/:id',
    passport.authenticate('jwt', { session: false }),
    userControllers.getByIdController,
);
router.patch('/update/:id', userControllers.updateController);
router.delete(
    '/delete/:id',
    passport.authenticate('jwt', { session: false }),
    userControllers.removeController,
);

module.exports = router;
