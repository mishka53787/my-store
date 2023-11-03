const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/User'); // Import your models

const router = express.Router();
const isAdmin = require('../isAdminMiddleware'); // Import the isAdmin middleware

// Route for adding a product (only accessible to admin)
app.post('/add-product', isAdmin, (req, res) => {
  // Handle product creation here
});


// Registration route
router.post('/register', async (req, res) => {
  try {
    const { username, password, email } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash the user's password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user and save it to the database
    const newUser = new User({ username, password: hashedPassword, email });
    await newUser.save();

    return res.status(201).json(newUser);
  } catch (error) {
    console.error('Registration failed:', error);
    return res.status(500).json({ error: 'Registration failed' });
  }
});

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
  
// Inside your login route
console.log('User-provided password:', req.body.password);
console.log('User retrieved from the database:', user);

// Assuming `user` is the retrieved user from the database
if (user && req.body.password) {
  // Ensure both values are defined before comparing
  // Compare the provided password with the hashed password
  bcrypt.compare(req.body.password, user.password, (err, result) => {
    if (err) {
      console.error('Password comparison error:', err);
      return res.status(500).json({ error: 'Password comparison error' });
    }
    if (result) {
      // Passwords match; log the user in
      console.log('Login successful');
      return res.status(200).json({ message: 'Login successful' });
    } else {
      console.log('Login failed: Incorrect password');
      return res.status(401).json({ error: 'Incorrect password' });
    }
  });
} else {
  console.log('Login failed: User not found or password not provided');
  return res.status(401).json({ error: 'User not found or password not provided' });
}
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

