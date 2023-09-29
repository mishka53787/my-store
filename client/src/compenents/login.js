import React, { useState } from 'react';

function Login() {
  const [formData, setFormData] = useState({
    usernameOrEmail: '',
    password: '',
  });

  const [loginSuccess, setLoginSuccess] = useState(false); // State for login success

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Simulate login success (replace with your actual login logic)
    try {
      // Send login data to your backend for user authentication
      // Example: const response = await fetch('/api/login', { method: 'POST', body: JSON.stringify(formData) });
      // Handle the response from the server, and if login is successful, setLoginSuccess(true);
      // Otherwise, handle the error.
      // For now, let's simulate success after a delay:
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate an API call delay
      setLoginSuccess(true);
    } catch (error) {
      // Handle login error here
      console.error('Login failed:', error);
    }
  };

  return (
    <div>
      <h1>User Login</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="usernameOrEmail" placeholder="Username or Email" onChange={handleInputChange} />
        <input type="password" name="password" placeholder="Password" onChange={handleInputChange} />
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

