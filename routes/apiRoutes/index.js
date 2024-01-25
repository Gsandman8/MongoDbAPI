const router = require('express').Router();
const UserRoutes = require('./userRoutes');
const ThoughtRoutes = require('./thoughtRoutes');

router.use('/users', UserRoutes);
router.use('/thoughts', ThoughtRoutes);

module.exports = router;