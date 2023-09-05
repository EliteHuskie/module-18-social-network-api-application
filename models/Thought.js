// Dependency for MongoDB
const mongoose = require('mongoose');

// Thought schema (Thought text, Created at, User and Reactions)
const thoughtSchema = new mongoose.Schema({
  thoughtText: {
    type: String,
    required: true,
    maxlength: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  reactions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reaction',
  }],
});

const Thought = mongoose.model('Thought', thoughtSchema);

// Module export for Thoughts
module.exports = Thought;