const express = require('express');
const router = express.Router();

const tutorRoutes = require('./tutors');
const learnerRoutes = require('./learners');
const matchRoutes = require('./matches');

router.use('/tutors', tutorRoutes);
router.use('/learners', learnerRoutes);
router.use('/matches', matchRoutes);

module.exports = router;