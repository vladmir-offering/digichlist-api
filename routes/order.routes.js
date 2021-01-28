const { Router } = require('express');
const passport = require('passport');
const { orderValidators } = require('../utils/validators.utils');
const orderControllers = require('../controllers/order.controllers');
const router = Router();

// POST http://localhost:5000/api/order/create
router.post('/create', orderValidators, orderControllers.createController);

// PATCH Protected JWT Web Token http://localhost:5000/api/order/update/:id
router.patch(
    '/update/:id',
    passport.authenticate('jwt', { session: false }),
    orderValidators,
    orderControllers.updateController,
);

// DELETE Protected JWT Web Token http://localhost:5000/api/order/delete/:id
router.delete(
    '/delete/:id',
    passport.authenticate('jwt', { session: false }),
    orderControllers.removeController,
);

// DELETE Protected JWT Web Token http://localhost:5000/api/order/deleteDoneByDate?start=StartDate&end=EndDate
router.delete(
    '/deleteDoneByDate',
    passport.authenticate('jwt', { session: false }),
    orderControllers.removeDoneByDateController,
);

// GET http://localhost:5000/api/order/getByUsername/:username
router.get('/getByUsername/:username', orderControllers.getByUsernameController);

// GET http://localhost:5000/api/order/getById/:id
router.get('/getById/:id', orderControllers.getByIdController);

// GET http://localhost:5000/api/order/all?start=StartDate&end=EndDate
router.get('/all', orderControllers.getAllController);

// GET Protected JWT Web Token http://localhost:5000/api/order/getByUserId/:userId
router.get(
    '/getByUserId/:userId',
    passport.authenticate('jwt', { session: false }),
    orderControllers.getByUserIdController,
);

module.exports = router;
