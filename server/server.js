// Import required packages
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;
// ...

// Connect to MongoDB (replace 'your-mongodb-uri' with your actual MongoDB URI)
mongoose.connect('mongodb+srv://mishkasathdeo:HdBJdEqaCbeeTkDg@cluster1.lsxcgsk.mongodb.net/store', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // Replace useCreateIndex with createIndexes

})
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Connection Error:', err));

// Middleware
app.use(express.json());
app.use(cors());

// Sample User Model (replace with your actual User model)
const User = mongoose.model('User', {
  username: String,
  password: String,
});

// Sample Product Model (replace with your actual Product model)
const Product = mongoose.model('Product', {
  name: String,
  description: String,
  price: Number,
  // Add more fields as needed
});

// Sample JWT Secret (replace with a secure secret)
const JWT_SECRET = '7e28b7dc04a97d0def889670ade7f42920528be37f67a3b3ea8c8960b5aab23d'; 

// Routes

// User registration
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// User login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    // Find the user in the database
    const user = await User.findOne({ username });

    // If the user doesn't exist or the password is incorrect, send an error response
    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(401).json({ error: 'Authentication failed' });
      return;
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET);

    // Send the token as a response
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Sample protected route that requires authentication
app.get('/profile', authenticateToken, (req, res) => {
  res.status(200).json({ message: 'Protected route', user: req.user });
});

// Sample route for retrieving products (you can add CRUD routes similarly)
app.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve products' });
  }
});

// Middleware for JWT authentication
function authenticateToken(req, res, next) {
  const token = req.header('authorization');
  if (token == null) return res.status(401).json({ error: 'Authentication failed' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Forbidden' });
    req.user = user;
    next();
  });
}





// Serve static files from the 'public' directory (for frontend)
app.use(express.static('public'));

// Define routes for different pages

// Landing Page (Home)
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/home.html');
  });
  
  // About Page
  app.get('/about', (req, res) => {
    res.sendFile(__dirname + '/public/about.html');
  });
  
  // Shop Page
  app.get('/shop', (req, res) => {
    res.sendFile(__dirname + '/public/shop.html');
  });
  
  // Contact Page
  app.get('/contact', (req, res) => {
    res.sendFile(__dirname + '/public/contact.html');
  });
  
  // Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });