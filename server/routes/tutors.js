const express = require('express');
const router = express.Router();
const tutorController = require('../controllers/tutorController');

router.get('/', tutorController.getAllTutors);
router.get('/:id', tutorController.getTutorById);
router.post('/', tutorController.createTutor);
router.delete('/:id', tutorController.deleteTutor);
router.put('/:id', tutorController.updateTutor);

module.exports = router;