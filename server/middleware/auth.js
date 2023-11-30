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
  // Middleware to check if the user has the "admin" role
function isAdmin(req, res, next) {
  // Assuming you have extracted user details from the token
  const user = req.user; // Extracted user information from the token

  if (user.role === 'admin') {
    // The user has the "admin" role, so they are authorized
    next();
  } else {
    // The user doesn't have the "admin" role, so they are unauthorized
    return res.status(403).json({ message: 'Access forbidden' });
  }
}

  
  // Middleware to check if the user is authenticated
function isAuthenticated(req, res, next) {
  const token = req.header('Authorization'); // Get the token from the request header
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // Verify the token and extract user information
  // If the token is valid, you can access user details, including their role
  // You should implement this JWT verification logic
  // ...

  // Proceed to the next middleware or route handler
  next();
}
// middleware/authenticate.js

const authenticate = (req, res, next) => {
  // Check if the user is authenticated
  if (req.session.user) {
    return next(); // User is authenticated, continue to the next middleware or route
  }
  // User is not authenticated, redirect to the login page or send an error response
  return res.status(401).json({ message: 'Unauthorized' });
};

module.exports = authenticate;



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
