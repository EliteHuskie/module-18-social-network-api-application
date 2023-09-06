// Dependencies for MongoDB
const Thought = require('../models/Thought');
const Reaction = require('../models/Reaction');

module.exports = {
// GET all Thoughts
  getAllThoughts: async (req, res) => {
    try {
      const thoughts = await Thought.find().populate('user').populate('reactions');
      res.status(200).json(thoughts);
    } catch (error) {
      res.status(500).json({ message: 'Error getting thoughts', error: error.message });
    }
  },
// GET Thought by ID
  getThoughtById: async (req, res) => {
    try {
      const thought = await Thought.findById(req.params.thoughtId)
        .populate('user')
        .populate('reactions');
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
      res.status(200).json(thought);
    } catch (error) {
      res.status(500).json({ message: 'Error getting thought', error: error.message });
    }
  },
// Create Thought
  createThought: async (req, res) => {
    try {
      const newThought = new Thought(req.body);
      await newThought.save();
      res.status(201).json(newThought);
    } catch (error) {
      res.status(400).json({ message: 'Error creating thought', error: error.message });
    }
  },
// Update Thought
  updateThought: async (req, res) => {
    try {
      const updatedThought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        req.body,
        { new: true, runValidators: true }
      );
      if (!updatedThought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
      res.status(200).json(updatedThought);
    } catch (error) {
      res.status(400).json({ message: 'Error updating thought', error: error.message });
    }
  },
// Delete Thought
deleteThought: async (req, res) => {
  try {
    const thoughtId = req.params.thoughtId;

    const thought = await Thought.findById(thoughtId);
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }

    // Delete the thought using deleteOne
    await Thought.deleteOne({ _id: thoughtId });

    res.status(200).json({ message: 'Thought deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting thought', error: error.message });
  }
},
// Add Reaction to Thought
   addReaction: async (req, res) => {
    try {
      const { thoughtId } = req.params;
      const { reactionBody, username } = req.body;

      const thought = await Thought.findById(thoughtId);

      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }

      const newReaction = new Reaction({ reactionBody, username });
      await newReaction.save();

      thought.reactions.push(newReaction._id);
      await thought.save();

      res.status(201).json(newReaction);
    } catch (error) {
      res.status(400).json({ message: 'Error adding reaction', error: error.message });
    }
  },

// Remove Reaction from Thought
  removeReaction: async (req, res) => {
    try {
      const { thoughtId, reactionId } = req.params;

      const thought = await Thought.findById(thoughtId);

      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }

      const reactionIndex = thought.reactions.findIndex(
        (reaction) => reaction._id.toString() === reactionId
      );

      if (reactionIndex === -1) {
        return res.status(404).json({ message: 'Reaction not found' });
      }

      thought.reactions.splice(reactionIndex, 1);
      await Reaction.findByIdAndDelete(reactionId);

      await thought.save();

      res.status(200).json({ message: 'Reaction removed' });
    } catch (error) {
      res.status(500).json({ message: 'Error removing reaction', error: error.message });
    }
  },
};