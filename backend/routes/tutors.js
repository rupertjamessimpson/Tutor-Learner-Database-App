const express = require('express');
const router = express.Router();
const tutorController = require('../controllers/tutorController');

router.get('/', tutorController.getAllTutors);
router.post('/', tutorController.createTutor);
router.put('/:id', tutorController.updateTutor);
router.delete('/:id', tutorController.deleteTutor);

module.exports = router;