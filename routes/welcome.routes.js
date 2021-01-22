const { Router } = require('express');
const welcomeControllers = require('../controllers/welcome.controllers');
const router = Router();

router.get('/', welcomeControllers.welcome);

module.exports = router;
