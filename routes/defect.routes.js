const { Router } = require('express');
const defectControllers = require('../controllers/defect.controllers');
const router = Router();

router.post('/create', defectControllers.createController);
router.patch('/update', defectControllers.updateController);

module.exports = router;
