import React, { useState } from 'react';

function Registration() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Registration was successful
        setRegistrationSuccess(true);

        // Automatically log in after successful registration
        loginUser(formData.username, formData.password);
      } else {
        console.error('Registration failed:', response.statusText);
      }
    } catch (error) {
      console.error('Network error during registration:', error);
    }
  }

  const loginUser = async (username, password) => {
    try {
      // Perform the login logic with username and password
      const loginResponse = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ usernameOrEmail: username, password }),
      });

      if (loginResponse.ok) {
        // Login is successful
        console.log('Auto-login successful');
        // Handle further actions or redirect the user
      } else {
        console.error('Auto-login failed:', loginResponse.statusText);
      }
    } catch (error) {
      console.error('Auto-login failed:', error);
    }
  };
  
  return (
    <div>
      <h1>User Registration</h1>
      <form onSubmit={handleSubmit}>
        {/* Input fields for registration */}
        <input type="text" name="username" placeholder="Username" onChange={handleInputChange} />
        <input type="email" name="email" placeholder="Email" onChange={handleInputChange} />
        <input type="password" name="password" placeholder="Password" onChange={handleInputChange} />
        <button type="submit">Register</button>
      </form>
      {/* Display success message if registration was successful */}
      {registrationSuccess && (
        <div className="success-popup">
          <p>Registration successful!</p>
        </div>
      )}
    </div>
  );
}

export default Registration;
