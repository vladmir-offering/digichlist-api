const { Router } = require('express');
const passport = require('passport');
const { orderCreateValidators, orderUpdateValidators } = require('../utils/validators.utils');
const orderControllers = require('../controllers/order.controllers');
const router = Router();

// POST http://localhost:5000/api/order/create
router.post('/create', orderCreateValidators, orderControllers.createController);

// PATCH http://localhost:5000/api/order/update/:id
router.patch('/update/:id', orderUpdateValidators, orderControllers.updateController);

// DELETE Protected JWT Web Token http://localhost:5000/api/order/delete/:id
router.delete(
    '/delete/:id',
    passport.authenticate('jwt', { session: false }),
    orderControllers.removeController,
);

// GET http://localhost:5000/api/order/getByDateAndDone?done=true/false&start=StartDate&end=EndDate
router.get('/getByDateAndDone', orderControllers.getByDateAndDoneController);

// DELETE Protected JWT Web Token http://localhost:5000/api/order/deleteDoneByDate?start=StartDate&end=EndDate
router.delete(
    '/deleteDoneByDate',
    passport.authenticate('jwt', { session: false }),
    orderControllers.removeDoneByDateController,
);

// GET Protected JWT Web Token http://localhost:5000/api/order/getByUsername/:username
router.get(
    '/getByUsername/:username',
    passport.authenticate('jwt', { session: false }),
    orderControllers.getByUsernameController,
);

// GET Protected JWT Web Token http://localhost:5000/api/order/getById/:id
router.get(
    '/getById/:id',
    passport.authenticate('jwt', { session: false }),
    orderControllers.getByIdController,
);

// GET http://localhost:5000/api/order/getByDone?done=true/false
router.get('/getByDone', orderControllers.getByDoneController);

// GET Protected JWT Web Token  http://localhost:5000/api/order/all
router.get(
    '/all',
    passport.authenticate('jwt', { session: false }),
    orderControllers.getAllController,
);

// GET Protected JWT Web Token http://localhost:5000/api/order/getByUserId/:userId
router.get(
    '/getByUserId/:userId',
    passport.authenticate('jwt', { session: false }),
    orderControllers.getByUserIdController,
);

module.exports = router;
