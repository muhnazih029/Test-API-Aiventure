const express = require('express');
const {
  registerUser,
  loginUser,
  getUserProfileById,
  updateUserProfile,
} = require('./user.service');
const { userAuthMiddleware } = require('../utils/auth.middleware');
const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: 'Name, email, and password are required' });
    }

    const result = await registerUser({ name, email, password });
    return res.status(201).json(result);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: 'Email and password are required' });
    }
    const { user, token } = await loginUser(email, password);
    res.json({ message: 'Login successful', user, token });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

router.get('/profile', userAuthMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const userProfile = await getUserProfileById(userId);
    res.json(userProfile);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.patch('/profile', userAuthMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const userData = req.body;

    if (!userData || Object.keys(userData).length === 0) {
      return res.status(400).json({
        message: 'Cannot update profile. Request body is empty.',
      });
    }
    const { changes, updatedUser } = await updateUserProfile(userId, userData);
    res.json({
      message: 'Profile updated successfully',
      changes,
      user: updatedUser,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
