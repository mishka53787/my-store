const express = require('express');
const router = express.Router();

// Serve the home page
router.get('/', function(req, res, next) {
  res.json({ message: 'Welcome to the home page' });
});

// Serve the about page
router.get('/about', function(req, res, next) {
  res.json({ message: 'About us' });
});

// Serve the shop page
router.get('/shop', function(req, res, next) {
  res.json({ message: 'Shop with us' });
});

// Serve the contact page
router.get('/contact', function(req, res, next) {
  res.json({ message: 'Contact us' });
});

module.exports = router;


