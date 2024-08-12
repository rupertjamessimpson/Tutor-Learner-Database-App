const express = require('express');
const router = express.Router();
const learnerController = require('../controllers/learnerController');

router.get('/', learnerController.getAllLearners);
router.get('/:id', learnerController.getLearnerById);

module.exports = router;