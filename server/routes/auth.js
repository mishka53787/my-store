const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User'); // Import your User model
const jwt = require('jsonwebtoken'); // Import the jsonwebtoken library
// Registration route
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

    return res.status(201).json(newUser);
  } catch (error) {
    console.error('Registration failed:', error);
    return res.status(500).json({ error: 'Registration failed' });
  }
});



router.post('/login', async (req, res) => {
  const { usernameOrEmail, password } = req.body;
  console.log(usernameOrEmail);
  console.log(password);
  try {
    // Find the user by username or email in the database
    const user = await User.findOne({
      $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
      
    });
  console.log(user);
    if (!user) {
      // User not found
      return res.status(401).json({ error: 'Authentication failed' });
    }

    if (user.password) {
      // Compare the provided password with the stored hashed password using async/await
      const result = await bcrypt.compare(password, user.password);

      if (result) {
        // Passwords match, user is authenticated
        // Generate a JWT token
        const token = jwt.sign({ userId: user._id }, '7e28b7dc04a97d0def889670ade7f42920528be37f67a3b3ea8c8960b5aab23d', { expiresIn: '1h' });

        // Send the token as a response
        res.status(200).json({ token });
      } else {
        // Passwords do not match, authentication failed
        res.status(401).json({ error: 'Authentication failed' });
      }
    } else {
      // Handle the case where the user's password is undefined or not stored correctly
      res.status(500).json({ error: 'Authentication failed' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Login failed' });
  }
});

module.exports = router;

