const { Router } = require('express');
const authorizationControllers = require('../controllers/authorization.controllers');
const router = Router();

router.post('/login', authorizationControllers.loginController);

module.exports = router;
