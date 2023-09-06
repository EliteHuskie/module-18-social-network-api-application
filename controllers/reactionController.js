// Dependencies for MongoDB
const Reaction = require('../models/Reaction');
const Thought = require('../models/Thought');

module.exports = {
// Create reaction
  createReaction: async (req, res) => {
    try {
      const thoughtId = req.params.thoughtId;
      const { reactionBody } = req.body;

      const thought = await Thought.findById(thoughtId);
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }

      const newReaction = new Reaction({
        reactionBody,
        user: req.user._id, // Assuming you have user authentication
      });

      await newReaction.save();
      thought.reactions.push(newReaction._id);
      await thought.save();

      res.status(201).json(newReaction);
    } catch (error) {
      res.status(400).json({ message: 'Error creating reaction', error: error.message });
    }
  },
// Remove reaction
  removeReaction: async (req, res) => {
    try {
      const thoughtId = req.params.thoughtId;
      const reactionId = req.params.reactionId;

      const thought = await Thought.findById(thoughtId);
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }

      const reactionIndex = thought.reactions.indexOf(reactionId);
      if (reactionIndex === -1) {
        return res.status(404).json({ message: 'Reaction not found' });
      }

      thought.reactions.splice(reactionIndex, 1);
      await thought.save();

      await Reaction.findByIdAndDelete(reactionId);

      res.status(200).json({ message: 'Reaction removed from thought' });
    } catch (error) {
      res.status(500).json({ message: 'Error removing reaction', error: error.message });
    }
  },
};