const express = require('express');
const router = express.Router();
const learnerController = require('../controllers/learnerController');

router.get('/', learnerController.getAllLearners);
router.get('/:id', learnerController.getLearnerById);
router.put('/update-conversation', learnerController.updateLearnerConversation);
router.put('/remove-conversation', learnerController.removeLearnerFromConversation);

module.exports = router;