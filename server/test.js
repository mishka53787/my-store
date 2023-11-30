const chai = require('chai');
const expect = chai.expect;
const express = require('express');
const supertest = require('supertest');

const app = express();

const checkUserRole = (requiredRole) => {
  return (req, res, next) => {
    // Your JWT verification logic here
    // Replace this with your actual logic to get the user's role
    const userRole = 'admin'; // Replace with your actual user role
    if (userRole !== requiredRole) {
      return res.status(403).json({ message: 'Access denied' });
    }
    next();
  };
};

app.use(checkUserRole('admin')); // Apply the middleware

app.get('/protected-route', (req, res) => {
  res.status(200).json({ message: 'Access granted' });
});

// Test cases
describe('User Role Middleware', () => {
  it('should allow access with the correct role', (done) => {
    supertest(app)
      .get('/protected-route')
      .expect(200)
      .end((err, res) => {
        expect(res.body.message).to.equal('Access granted');
        done(err);
      });
  });
});
