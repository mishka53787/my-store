const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/models'); // Import your models

const router = express.Router();
const isAdmin = require('../isAdminMiddleware'); // Import the isAdmin middleware

// Route for adding a product (only accessible to admin)
app.post('/add-product', isAdmin, (req, res) => {
  // Handle product creation here
});



// Registration route
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Create a new user and save it to the database
    const newUser = new User({ username, password });
    await newUser.save();

    return res.status(201).json(newUser);
  } catch (error) {
    console.error('Registration failed:', error);
    return res.status(500).json({ error: 'Registration failed' });
  }
})

// Add this route to your Express app
router.post('/login', async (req, res) => {
  try {
    const { usernameOrEmail, password } = req.body;

    // Authenticate the user based on username or email and password
    // Check if the user exists and if the provided password matches the hashed password in the database
    // Generate a JWT token and send it back if login is successful

    // If successful, send a JSON response with the token
    // Example: res.status(200).json({ token: generatedToken });

    // If login fails, send an error response
    // Example: res.status(401).json({ error: 'Login failed' });
  } catch (error) {
    console.error('Login failed:', error);
    return res.status(500).json({ error: 'Login failed' });
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

