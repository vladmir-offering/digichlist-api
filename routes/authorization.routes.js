const { Router } = require('express');
const authorizationControllers = require('../controllers/authorization.controllers');
const router = Router();

// POST http://localhost:5000/api/authorization/login
router.post('/login', authorizationControllers.loginController);

module.exports = router;
