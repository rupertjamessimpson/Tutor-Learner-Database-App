const express = require('express');
const router = express.Router();

const tutorRoutes = require('./tutors');
const learnerRoutes = require('./learners');

router.use('/tutors', tutorRoutes);
router.use('/learners', learnerRoutes);

module.exports = router;