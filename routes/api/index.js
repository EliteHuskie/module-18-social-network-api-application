// Dependencies for MongoDB
const router = require('express').Router();
const thoughtRoutes = require('./thoughtRoutes');
const userRoutes = require('./userRoutes');

// Router for Thoughts and Users
router.use('/thoughts', thoughtRoutes);
router.use('/users', userRoutes);

// Module exports for router
module.exports = router;