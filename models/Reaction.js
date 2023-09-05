// Dependency for MongoDB
const mongoose = require('mongoose');

// Reaction schema (Reaction body, Created at and User)
const reactionSchema = new mongoose.Schema({
  reactionBody: {
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
});

const Reaction = mongoose.model('Reaction', reactionSchema);

// Module export for Reactions
module.exports = Reaction;