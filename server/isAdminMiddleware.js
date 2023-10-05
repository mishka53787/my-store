// isAdminMiddleware.js

function isAdmin(req, res, next) {
  if (req.user && req.user.role === 'admin') {
    // User has admin privileges, allow access
    next();
  } else {
    // User is not an admin, deny access
    res.status(403).json({ message: 'Access denied' });
  }
}

module.exports = isAdmin;
