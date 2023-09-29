const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/models'); // Import your models

const router = express.Router();

// User Registration
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  
  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create a new user
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    
    // Create and send a JWT token
    const token = jwt.sign({ userId: newUser._id }, 'your-secret-key', { expiresIn: '1h' });
    res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// User Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user in the database
    const user = await User.findOne({ username });

    // If the user doesn't exist or the password is incorrect, send an error response
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Authentication failed' });
    }

    // Create and send a JWT token
    const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Login failed' });
  }
});

function authenticateToken(req, res, next) {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ error: 'Authentication required' });

  jwt.verify(token, 'your-secret-key', (err, user) => {
    if (err) return res.status(403).json({ error: 'Forbidden' });

    // You can add user information to the request for further use
    req.user = user;
    next();
  });
}

// Example: Protect a route that requires authentication
router.get('/protected-route', authenticateToken, (req, res) => {
  // Access the authenticated user via req.user
  res.status(200).json({ message: 'Protected route', user: req.user });
});

module.exports = router;

