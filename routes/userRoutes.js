// Dependencies for MongoDB
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// GET all users
router.get('/', userController.getAllUsers);

// GET user by ID
router.get('/:userId', userController.getUserById);

// POST to create new user
router.post('/', userController.createUser);

// PUT to update user by ID
router.put('/:userId', userController.updateUser);

// DELETE a user by ID
router.delete('/:userId', userController.deleteUser);

// POST to add to user's friend list
router.post('/:userId/friends/:friendId', userController.addFriend);

// DELETE to remove from user's friend list
router.delete('/:userId/friends/:friendId', userController.removeFriend);

// Module export for router
module.exports = router;