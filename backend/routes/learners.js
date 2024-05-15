const express = require('express');
const router = express.Router();
const learnerController = require('../controllers/learnerController');

router.get('/', learnerController.getAllLearners);
router.post('/', learnerController.createLearner);
router.put('/:id', learnerController.updateLearner);
router.delete('/:id', learnerController.deleteLearner);

module.exports = router;