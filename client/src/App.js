import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './compenents/Home';
import Contact from './compenents/Contact';
import Registration from './compenents/registration';
import Login from './compenents/login';
import Products from './compenents/products';
import Header from './compenents/Header';
import ShoppingCart from './compenents/ShopCart';
import Footer from './compenents/Footer';
import AdminDashboard from './compenents/AdminDashboard';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [userRole, setUserRole] = useState(null);
  const isUserSignedIn = userRole !== null;

  // Define these functions or import them from the appropriate modules
  const setLoggedInUserRole = (role) => {
    setUserRole(role);
  };

  const removeFromCart = (index) => {
    // Implement your logic for removing items from the cart
  };

  const clearCart = () => {
    // Implement your logic for clearing the cart
  };

  return (
    <Router>
      <div>
        <Header userRole={userRole} />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/registration" element={<Registration />} />
            {!isUserSignedIn && (
              <Route
                path="/login"
                element= {<Login setLoggedInUserRole={setLoggedInUserRole }userRole={userRole} />}
                          />  )
            }
            {isUserSignedIn && (
              <>
        <Route path="/products" element={<Products userRole={userRole} />} />
                <Route path="/Shopcart" element={<ShoppingCart cartItems={cartItems} />} />
                {userRole === 'admin' && (
                  <Route path="/admin" element={<AdminDashboard />} />
                )}
              </>
          )  }
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
















