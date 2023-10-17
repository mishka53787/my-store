import React from 'react';
import { Link } from 'react-router-dom';
import '../stylesheets/Header.css';

function Header({ isLoggedIn, logout }) {
  const handleLogout = () => {
    // Call the logout function here to log the user out
    logout();
  };

  return (
    <header className="header">
      <div className="logo">
        <img src="/images/picture.jpeg" alt=""></img>
      </div>
      <nav className="nav">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
          <li>
            <Link to="/cart">Cart</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          {isLoggedIn ? (
            <>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/registration">Register</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;

