// Dependencies for MongoDB
const User = require('../models/User');
const Thought = require('../models/Thought');

module.exports = {
// GET all Users
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: 'Error getting users', error: error.message });
    }
  },
// GET user by ID
  getUserById: async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: 'Error getting user', error: error.message });
    }
  },
// Create User
  createUser: async (req, res) => {
    try {
      const newUser = new User(req.body);
      await newUser.save();
      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json({ message: 'Error creating user', error: error.message });
    }
  },
// Update User
  updateUser: async (req, res) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.userId,
        req.body,
        { new: true, runValidators: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(400).json({ message: 'Error updating user', error: error.message });
    }
  },
// Delete User
  deleteUser: async (req, res) => {
    try {
      const userId = req.params.userId;

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      await Thought.deleteMany({ user: userId });

      await user.remove();

      res.status(200).json({ message: 'User and associated thoughts deleted' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting user', error: error.message });
    }
  },
// Add Friend to User
addFriend: async (req, res) => {
  try {
    const { userId, friendId } = req.params;

    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (!user || !friend) {
      return res.status(404).json({ message: 'User or friend not found' });
    }

    if (user.friends.includes(friendId)) {
      return res.status(400).json({ message: 'User is already friends with this user' });
    }

    user.friends.push(friendId);
    friend.friends.push(userId);

    await user.save();
    await friend.save();

    res.status(200).json({ message: 'Friend added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding friend', error: error.message });
  }
},

// Remove Friend from User
removeFriend: async (req, res) => {
  try {
    const { userId, friendId } = req.params;

    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (!user || !friend) {
      return res.status(404).json({ message: 'User or friend not found' });
    }

    if (!user.friends.includes(friendId)) {
      return res.status(400).json({ message: 'User is not friends with this user' });
    }

    user.friends = user.friends.filter((id) => id !== friendId);
    friend.friends = friend.friends.filter((id) => id !== userId);

    await user.save();
    await friend.save();

    res.status(200).json({ message: 'Friend removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error removing friend', error: error.message });
  }
},
};