const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User'); // Import your User model
const jwt = require('jsonwebtoken'); // Import the jsonwebtoken library

// Registration route
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body; // Include email in the request

    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Create a new user and save it to the database
    const newUser = new User({ username, email, password }); // Include email
    await newUser.save();
 console.log (newUser,"new user")
    return res.status(201).json(newUser);
  } catch (error) {
    console.error('Registration failed:', error);
    return res.status(500).json({ error: 'Registration failed' });
  }
});

router.post('/login', async (req, res) => {
  const { usernameOrEmail, password } = req.body;

  try {
    // Check if the user is an admin
    if (usernameOrEmail === 'admin53787' && password === 'adminpassword') {
      // Admin login
      const adminToken = jwt.sign({ role: 'admin' }, 'your-secret-key', {
        expiresIn: '1h',
      });
      return res.status(200).json({ token: adminToken, role: 'admin' });
    }

    // For regular users, find the user by username or email in the database
    const user = await User.findOne({
      $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
    });

    if (!user) {
      // User not found
      return res.status(401).json({ error: 'Authentication failed' });
    }

    // Compare the provided password with the stored hashed password
    const result = await bcrypt.compare(password, user.password);

    if (result) {
      // Passwords match, user is authenticated
      // Generate a JWT token for the user
      const token = jwt.sign({ userId: user._id }, 'your-secret-key', {
        expiresIn: '1h',
      });

      // Send the token as a response
      res.status(200).json({ token, role: 'user' });
    } else {
      // Passwords do not match, authentication failed
      res.status(401).json({ error: 'Authentication failed' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Login failed' });
  }
});

router.post('/logout', (req, res) => {
  // Clear the user session
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
    res.json({ message: 'Logout successful' });
  });
});



module.exports = router;

