import React, { useState } from 'react';

function Registration() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'user', // Default role for registration
  });

  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send registration data to your backend for user registration
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
      } else {
        // Registration failed, handle the error
        console.error('Registration failed:', response.statusText);
      }
    } catch (error) {
      // Handle any network errors
      console.error('Network error during registration:', error);
    }
  }

  return (
    <div>
      <h1>User Registration</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" onChange={handleInputChange} />
        <input type="email" name="email" placeholder="Email" onChange={handleInputChange} />
        <input type="password" name="password" placeholder="Password" onChange={handleInputChange} />
        <select name="role" value={formData.role} onChange={handleInputChange}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit">Register</button>
      </form>

      {/* Display the pop-up message if registrationSuccess is true */}
      {registrationSuccess && (
        <div className="success-popup">
          <p>Registration successful!</p>
          <button onClick={() => setRegistrationSuccess(false)}>Close</button>
        </div>
      )}
    </div>
  );
}

export default Registration;

