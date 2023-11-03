import React, { useState } from 'react';

function Login({ setUserRole }) {
  const [formData, setFormData] = useState({
    usernameOrEmail: '', // Initialize with an empty string
    password: '', // Initialize with an empty string
  });

  const [loginSuccess, setLoginSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null); // Define errorMessage state

  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogout = () => {
    // Implement the logout functionality here, e.g., clear user session or JWT token
    // You may also want to redirect the user to the logout page
    // Example: history.push('/logout');
    setLoginSuccess(false); // Set login success to false when logging out
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Login is successful
        setLoginSuccess(true);
      } else {
        // Handle login failure
        if (response.status === 401) {
          const errorData = await response.json(); // Parse the response JSON
          console.error('Unauthorized - Invalid credentials:', errorData.error);

          // Set the error message state to display a user-friendly message
          setErrorMessage(errorData.error);
        } else {
          console.error('Login failed with an unexpected error');
          // Handle the error appropriately, e.g., set an error state
        }
        setLoginSuccess(false);
      }
    } catch (error) {
      // Handle network errors or any other unexpected errors
      console.error('Login failed:', error);

      // Set the error message state to display a user-friendly message
      setErrorMessage('An unexpected error occurred.');
      setLoginSuccess(false);
    }
  };

  return (
    <div>
      <h1>User Login</h1>
      <form onSubmit={handleSubmit}>
        {/* Controlled inputs */}
        <input
          type="text"
          name="usernameOrEmail"
          value={formData.usernameOrEmail}
          onChange={handleInputChange}
          placeholder="Username or Email"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="Password"
        />

        {/* Other form fields */}
        <button type="submit">Login</button>
        {loginSuccess && (
          <button onClick={handleLogout}>Logout</button>
        )}
      </form>

      {/* Display the error message if there's a login failure */}
      {errorMessage && (
        <div className="error-popup">
          <p>{errorMessage}</p>
        </div>
      )}

      {/* Display the pop-up message if loginSuccess is true */}
      {loginSuccess && (
        <div className="success-popup">
          <p>Login successful!</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
}

export default Login;