const { Router } = require('express');
const orderControllers = require('../controllers/order.controllers');
const router = Router();

// POST http://localhost:5000/api/order/create
router.post('/create', orderControllers.createController);

// PATCH http://localhost:5000/api/order/update/:id
router.patch('/update/:id', orderControllers.updateController);

// GET http://localhost:5000/api/order/getById/:id
router.get('/getById/:id', orderControllers.getByIdController);

// GET http://localhost:5000/api/order/all?start=StartDate&end=EndDate
router.get('/all', orderControllers.getAllController);

// GET http://localhost:5000/api/order/:userId
router.get('/:userId', orderControllers.getByUserController);

// DELETE http://localhost:5000/api/order/delete/:id
router.delete('/delete/:id', orderControllers.removeController);

module.exports = router;
