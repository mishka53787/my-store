// Import required packages
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./models/User'); // Adjust the path to match your project structure

const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;


const isAdmin = require('./middleware/isAdminMiddleware'); // Import the isAdmin middleware



// Example route that requires admin privileges
app.get('/admin-route', isAdmin, (req, res) => {
  // Handle admin-specific functionality
  res.json({ message: 'Admin route accessed successfully' });
});




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

// Initialize Passport and configure it to use the strategies
app.use(passport.initialize());

// Include the Passport configuration
require('./config/passport');






// Sample JWT Secret (replace with a secure secret)
const JWT_SECRET = '7e28b7dc04a97d0def889670ade7f42920528be37f67a3b3ea8c8960b5aab23d'; 

// Routes
//Use your route files
const authRoutes = require('./routes/auth'); // Import auth routes

app.use('/', authRoutes); // Use auth routes

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

  if (!user) {
    // User not found, handle accordingly
    return res.status(401).json({ error: 'Authentication failed' });
  }
  
  // Compare the provided password with the stored hashed password
  bcrypt.compare(password, user.password, (err, result) => {
    if (err) {
      console.error('Password comparison error:', err);
      return res.status(500).json({ error: 'Authentication failed' });
    }
    if (result) {
      // Passwords match, user is authenticated
      // Generate a JWT or perform other authentication tasks here
      res.status(200).json({ message: 'Authentication successful' });
    } else {
      // Passwords do not match, authentication failed
      res.status(401).json({ error: 'Authentication failed' });
    }
  });

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

app.post('/', (req, res) => {
  // Check if the user has admin privileges
  if (req.user && req.user.role === 'admin') {
    // User has admin privileges, allow product creation
    // Handle product creation logic here
    // You can access the product data from req.body
    // Save the product to the database and respond with success message
  } else {
    // User is not an admin, deny access to product creation
    res.status(403).json({ message: 'Access denied' });
  }
});

app.post('/add-product', async (req, res) => {
  try {
    // Extract product data from the request body
    const { name, description, price } = req.body;

    // Create a new product instance
    const newProduct = new Product({
      name,
      description,
      price,
      // Add more fields as needed
    });

    // Save the product to the database
    await newProduct.save();

    // Respond with a success message
    res.status(201).json({ message: 'Product added successfully' });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.use(express.json());

// Middleware to check user authentication and role
const authorizeAdmin = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    if (decoded.role === 'admin') {
      next(); // User is authorized
    } else {
      res.status(403).json({ message: 'Forbidden' });
    }
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

app.post('/add-product', authorizeAdmin, (req, res) => {
  // Add a product here
  // ...
  res.json({ message: 'Product added' });
});



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