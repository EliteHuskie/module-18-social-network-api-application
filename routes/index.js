// Dependencies for MongoDB
const router = require('express').Router();
const apiRoutes = require('./api');

// Router for apiRoutes
router.use('/api', apiRoutes);

router.use((req, res) => {
  return res.send('Incorrect route!');
});

// Module exports for router
module.exports = router;