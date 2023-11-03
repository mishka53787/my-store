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
  


const passportJWT = require('passport-jwt');

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const jwtOptions = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'your-secret-key',
};

passport.use(
  new JWTStrategy(jwtOptions, (jwtPayload, done) => {
    // Find the user in your database if needed
    // Check if the user exists, and if so, call 'done(null, user)'
    // If the user doesn't exist or there's an error, call 'done(error)'
  })
);


module.exports = { requireAuth };
