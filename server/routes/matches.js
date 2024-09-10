const express = require('express');
const router = express.Router();
const matchesController = require('../controllers/matchesController');

router.get('/', matchesController.getAllMatches);
router.post('/', matchesController.createOrUpdateMatch);
router.delete('/:id', matchesController.deleteMatch);

module.exports = router;