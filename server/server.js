// Import required packages
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./models/User'); // Adjust the path to match your project structure
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;


const dotenv = require('dotenv'); // Include dotenv
dotenv.config(); // Load environment variables from .env

const isAdmin = require('./middleware/isAdminMiddleware'); // Import the isAdmin middleware

// Define a middleware for verifying user roles using JWT
const checkUserRole = (requiredRole) => {
  return (req, res, next) => {
    // Your JWT verification logic here
    // Verify the user's JWT and get their role
    const userRole = 'user'; // Replace with your actual user role
    if (userRole !== requiredRole) {
      return res.status(403).json({ message: 'Access denied' });
    }
    next();
  };
};

// Use the middleware to protect routes
app.get('/products', checkUserRole('user'), (req, res) => {
  // Route logic for fetching products
});

app.get('/admin', checkUserRole('admin'), (req, res) => {
  // Route logic for admin-specific functionality
});


// Define a route for setting a user as admin
app.post('/set-admin/:userId', (req, res) => {
  // Check if the user making the request has admin privileges
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
  }

  // Update the user's role to 'admin' based on the provided userId
  User.findByIdAndUpdate(req.params.userId, { role: 'admin' }, (err, user) => {
    if (err) {
      return res.status(500).json({ message: 'Error setting admin role' });
    }
    return res.status(200).json({ message: 'User is now an admin' });
  });
});






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
app.use(bodyParser.json());

// Initialize Passport and configure it to use the strategies
app.use(passport.initialize());

// Include the Passport configuration
require('./config/passport');






// Sample JWT Secret (replace with a secure secret)
const JWT_SECRET =process.env.JWT_SECRET || '7e28b7dc04a97d0def889670ade7f42920528be37f67a3b3ea8c8960b5aab23d'; 

// Routes
//Use your route files
const authRoutes = require('./routes/auth'); // Import auth routes

app.use('/', authRoutes); // Use auth routes

// Import your product route
const productRoutes = require('./routes/products');

// Use the product route in your app
app.use('/products', productRoutes);

// User registration
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
    // Set the user's role to the default role (e.g., "user")
    const role = 'user'
  try {
    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with the hashed password
    const user = new User({ username, password: hashedPassword }); // Store the hashed password

    // Save the user to the database
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Registration failed' });
  }
});



// Login route (do not use `router`)
app.post('/login', async (req, res) => {
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
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

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



app.get('/authenticated', passport.authenticate('jwt', { session: false }), (req, res) => {
  // If the middleware passes, the user is authenticated
  res.json({ message: 'Authenticated route' });
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

// Sample product route for getting all products
app.get('/products', (req, res) => {
  // Replace this with your logic to fetch and return a list of products
  res.status(200).json({ message: 'List of products' });
});

// Sample route for adding a product (requires admin role)
app.post('/products', checkUserRole('admin'), (req, res) => {
  // Replace this with your logic to add a product to the database
  res.status(201).json({ message: 'Product added successfully' });
});

// Sample cart route (protected, user-specific)
app.get('/cart', passport.authenticate('jwt', { session: false }), (req, res) => {
  // Replace this with your logic to display the user's cart
  res.status(200).json({ message: 'User cart' });
});

// Sample route for adding an item to the user's cart (protected, user-specific)
app.post('/cart/add', passport.authenticate('jwt', { session: false }), (req, res) => {
  // Replace this with your logic to add an item to the user's cart
  res.status(201).json({ message: 'Item added to cart' });
});

// Sample route for checking out the user's cart (protected, user-specific)
app.post('/cart/checkout', passport.authenticate('jwt', { session: false }), (req, res) => {
  // Replace this with your logic to process the user's cart checkout
  res.status(200).json({ message: 'Cart checked out' });
});

// Sample route that requires admin privileges
app.get('/admin-route', checkUserRole('admin'), (req, res) => {
  // Replace this with your logic for admin-specific functionality
  res.status(200).json({ message: 'Admin route accessed successfully' });
});

// Serve static files from the 'public' directory (for frontend)
app.use(express.static('public'));

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


// Middleware for verifying JWT tokens
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).send('Access denied.');

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send('Invalid token.');
  }
};

app.get('/protected-route', verifyToken, (req, res) => {
  // Your protected route logic
});

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

  module.exports = app; // Export the Express app