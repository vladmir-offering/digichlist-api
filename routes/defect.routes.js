const { Router } = require('express');
const passport = require('passport');
const { defectCreateValidators, defectUpdateValidators } = require('../utils/validators.utils');
const defectControllers = require('../controllers/defect.controllers');
const router = Router();

// POST http://localhost:5000/api/defect/create
router.post('/create', defectCreateValidators, defectControllers.createController);

// PATCH http://localhost:5000/api/defect/update/:id
router.patch('/update/:id', defectUpdateValidators, defectControllers.updateController);

// GET Protected JWT Web Token http://localhost:5000/api/defect/getById/:id
router.get(
    '/getById/:id',
    passport.authenticate('jwt', { session: false }),
    defectControllers.getByIdController,
);

// GET Protected JWT Web Token http://localhost:5000/api/defect/all
router.get(
    '/all',
    passport.authenticate('jwt', { session: false }),
    defectControllers.getAllController,
);

// GET http://localhost:5000/api/defect/getByDateAndStatus?status=DefectStatus&date_type=open_date/close_date&start=StartDate&end=EndDate
router.get('/getByDateAndStatus', defectControllers.getByDateAndStatusController);

// GET http://localhost:5000/api/defect/getByStatus?status=DefectStatus
router.get('/getByStatus', defectControllers.getByStatusController);

// GET Protected JWT Web Token http://localhost:5000/api/defect/getByUserId/:userId
router.get(
    '/getByUserId/:userId',
    passport.authenticate('jwt', { session: false }),
    defectControllers.getByUserIdController,
);

// DELETE Protected JWT Web Token http://localhost:5000/api/defect/deleteByDateAndStatus?status=DefectStatus&date_type=open_date/close_date&start=StartDate&end=EndDate
router.delete(
    '/deleteByDateAndStatus',
    passport.authenticate('jwt', { session: false }),
    defectControllers.removeByDateAndStatusController,
);

// DELETE Protected JWT Web Token http://localhost:5000/api/defect/delete/:id
router.delete(
    '/delete/:id',
    passport.authenticate('jwt', { session: false }),
    defectControllers.removeController,
);

module.exports = router;
