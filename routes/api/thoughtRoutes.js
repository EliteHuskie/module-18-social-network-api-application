// Dependencies for MongoDB
const express = require('express');
const router = express.Router();
const thoughtController = require('../../controllers/thoughtController');

// GET all thoughts
router.get('/', thoughtController.getAllThoughts);

// GET thought by ID
router.get('/:thoughtId', thoughtController.getThoughtById);

// POST to create new thought
router.post('/', thoughtController.createThought);

// PUT to update thought by ID
router.put('/:thoughtId', thoughtController.updateThought);

// DELETE thought by ID
router.delete('/:thoughtId', thoughtController.deleteThought);

// POST to add reaction to thought
router.post('/:thoughtId/reactions', thoughtController.addReaction);

// DELETE to remove reaction from thought
router.delete('/:thoughtId/reactions/:reactionId', thoughtController.removeReaction);

// Module export for router
module.exports = router;