// Dependencies for MongoDB
const express = require('express');
const router = express.Router();
const reactionController = require('../controllers/reactionController');

// POST to create a new reaction for a thought
router.post('/:thoughtId', reactionController.createReaction);

// DELETE to remove a reaction from a thought
router.delete('/:thoughtId/:reactionId', reactionController.removeReaction);

// Module exports for router
module.exports = router;