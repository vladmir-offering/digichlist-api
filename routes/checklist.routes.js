const { Router } = require('express');
const { checklistValidators } = require('../utils/validators.utils');
const checklistControllers = require('../controllers/checklist.controllers');
const router = Router();

// POST http://localhost:5000/api/checklist/create
router.post('/create', checklistValidators, checklistControllers.createController);

// PATCH http://localhost:5000/api/checklist/update/:id
router.patch('/update/:id', checklistValidators, checklistControllers.updateController);

// GET http://localhost:5000/api/checklist/getById/:id
router.get('/getById/:id', checklistControllers.getByIdController);

// GET http://localhost:5000/api/checklist/all
router.get('/all', checklistControllers.getAllController);

// GET http://localhost:5000/api/checklist/:userId
router.get('/:userId', checklistControllers.getByUserController);

// DELETE http://localhost:5000/api/checklist/delete/:id
router.delete('/delete/:id', checklistControllers.removeController);

module.exports = router;
