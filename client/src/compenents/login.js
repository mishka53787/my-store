import React, { useState } from 'react';

function Login() {
  const [formData, setFormData] = useState({
    usernameOrEmail: '', // Initialize with an empty string
    password: '', // Initialize with an empty string
  });

  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send login data to your backend for user authentication
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        // Login is successful
        // No need to assign response.json() to a variable if it's not used further
        setLoginSuccess(true);
      } else {
        // Login failed, handle the error
        setLoginSuccess(false);
      }
    } catch (error) {
      console.error('Login failed:', error);
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
          value={formData.usernameOrEmail} // Ensure value is controlled
          onChange={handleInputChange}
          placeholder="Username or Email"
        />
        <input
          type="password"
          name="password"
          value={formData.password} // Ensure value is controlled
          onChange={handleInputChange}
          placeholder="Password"
        />
       <select name="role" value={formData.role} onChange={handleInputChange}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
    
        {/* Other form fields */}
        <button type="submit">Login</button>
      </form>
      {/* Display the pop-up message if loginSuccess is true */}
      {loginSuccess && (
        <div className="success-popup">
          <p>Login successful!</p>
          <button onClick={() => setLoginSuccess(false)}>Close</button>
        </div>
      )}
    </div>
  );
}

export default Login;




