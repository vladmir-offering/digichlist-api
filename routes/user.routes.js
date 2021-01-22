const { Router } = require('express');
const userControllers = require('../controllers/user.controllers');
const router = Router();

router.post('/create', userControllers.createController);

module.exports = router;
