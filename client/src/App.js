import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './compenents/Header';
import Home from './compenents/Home';
import Contact from './compenents/Contact';
import Registration from './compenents/registration';
import Login from './compenents/login';
import Products from './compenents/products';
import ShoppingCart from './compenents/ShopCart';
import AdminDashboard from './compenents/AdminDashboard';
import NotFound from './compenents/NotFound';
import Footer from './compenents/Footer';

import Profile from './compenents/profile';

function App() {
  const [userRole, setUserRole] = useState(null);
  const cartItems = []; // Define cartItems as an array

  return (
    <Router>
      <div>
        <Header userRole={userRole} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/registration"
            element={
              userRole ? (
                <Navigate to="/dashboard" />
              ) : (
                <Registration setUserRole={setUserRole} />
              )
            }
          />
          <Route
            path="/login"
            element={
              userRole ? (
                <Navigate to="/dashboard" />
              ) : (
                <Login setUserRole={setUserRole} />
              )
            }
          />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<ShoppingCart cartItems={cartItems} />} />


          {/* Profile Route */}
          <Route
            path="/profile"
            element={<Profile userRole={userRole} />}
          />

          {/* Admin Dashboard Route */}
          {userRole === 'admin' && (
            <Route path="/admin" element={<AdminDashboard />} />
          )}

          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
