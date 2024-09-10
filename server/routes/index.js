const express = require('express');
const router = express.Router();

const tutorRoutes = require('./tutors');
const learnerRoutes = require('./learners');
const matchRoutes = require('./matches');
const userRoutes = require('./users');

router.use('/tutors', tutorRoutes);
router.use('/learners', learnerRoutes);
router.use('/matches', matchRoutes);
router.use('/users', userRoutes);

module.exports = router;