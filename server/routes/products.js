const express = require('express');
const { Product } = require('../models/Product'); // Import your models

const router = express.Router();

// Create a new product
router.post('/', async (req, res) => {
  const { name, description, price } = req.body;

  try {
    const newProduct = new Product({ name, description, price });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create product' });
  }
});

// Retrieve all products
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve products' });
  }
});

// Fetch all products
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return res.status(500).json({ error: 'Error fetching products' });
  }
});
        

// Update a product by ID
router.put('/products/:id', async (req, res) => {
  const { name, description, price } = req.body;
  const productId = req.params.id;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { name, description, price },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update product' });
  }
});

// Delete a product by ID
router.delete('/products/:id', async (req, res) => {
  const productId = req.params.id;

  try {
    await Product.findByIdAndDelete(productId);
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete product' });
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
