import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = ({ isLoggedIn, user, onLogout }) => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/products">Products</Link>
        </li>
        <li>
          <Link to="/cart">Shopping Cart</Link>
        </li>
        {isLoggedIn ? (
          <>
            {user.role === 'admin' && (
              <li>
                <Link to="/dashboard">Admin Dashboard</Link>
              </li>
            )}
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <button onClick={onLogout}>Logout</button>
            </li>
          </>
        ) : (
          <>
           
          </>
        )}
        <li>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
