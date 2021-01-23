const { Router } = require('express');
const passport = require('passport');
const defectControllers = require('../controllers/defect.controllers');
const router = Router();

router.post('/create', defectControllers.createController);
router.patch(
    '/update/:id',
    passport.authenticate('jwt', { session: false }),
    defectControllers.updateController,
);
router.get(
    '/getById/:id',
    passport.authenticate('jwt', { session: false }),
    defectControllers.getByIdController,
);
router.get(
    '/all',
    passport.authenticate('jwt', { session: false }),
    defectControllers.getAllController,
);
router.get('/getByDate', defectControllers.getByDateController);
router.get(
    '/:status',
    passport.authenticate('jwt', { session: false }),
    defectControllers.getByStatusController,
);
router.get(
    '/:userId',
    passport.authenticate('jwt', { session: false }),
    defectControllers.getByUserController,
);

module.exports = router;
