import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './compenents/Home';
import Contact from './compenents/Contact';
import Registration from './compenents/registration';
import Login from './compenents/login';
import Products from './compenents/products';
import Header from './compenents/Header';
import ShoppingCart from './compenents/ShopCart'; // Import the ShoppingCart component
import Footer from './compenents/Footer';
import RoleBasedComponent from './compenents/RoleBasedComponent';


function App() {
  const [cartItems, setCartItems] = useState([]);

  // Function to remove items from the cart
  const removeFromCart = (index) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    setCartItems(updatedCart);
  };

  // Function to clear the entire cart
  const clearCart = () => {
    setCartItems([]);
  };
  const user = {
    role: 'admin', // This can be 'admin', 'user', or any other role
  };


  return (
    <Router>
      <div>
        <Header /> {/* Use the Header component */}
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/products" element={<Products />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/Cart"
              element={
                <ShoppingCart
                  cartItems={cartItems}
                  removeFromCart={removeFromCart}
                  clearCart={clearCart}
                />
              }
            />
          </Routes>
        </div>
        <RoleBasedComponent userRole={user.role} allowedRoles={['admin']}>
        {/* Content or actions restricted to admin users */}
        <button onClick={() => console.log('Admin action')}>Admin Action</button>
      </RoleBasedComponent>

      <RoleBasedComponent userRole={user.role} allowedRoles={['user']}>
        {/* Content or actions restricted to regular users */}
        <button onClick={() => console.log('User action')}>User Action</button>
      </RoleBasedComponent>

        <Footer/>
      </div>
    </Router>
  );
}

export default App;






