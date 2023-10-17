// middleware/auth.js
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });

// Middleware to check user role
function checkUserRole(role) {
    return (req, res, next) => {
      // Get the user's role from the JWT (you'll need to implement this part)
      const userRole = req.user.role;
  
      // Check if the user's role matches the required role
      if (userRole === role) {
        // User has the required role, proceed to the next middleware or route
        next();
      } else {
        // User does not have the required role, return a forbidden response
        res.status(403).json({ error: 'Access denied' });
      }
    };
  }
  
  // Protect the route with the middleware
  app.post('/add-product', checkUserRole('admin'), (req, res) => {
    // Only users with the 'admin' role can add a product
    // Handle product creation logic here
  });
  

module.exports = { requireAuth };
