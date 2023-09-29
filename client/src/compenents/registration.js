import React, { useState } from 'react';

function Registration() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [registrationSuccess, setRegistrationSuccess] = useState(false); // State for registration success

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Simulate registration success (replace with your actual registration logic)
    try {
      // Send registration data to your backend for user registration
      // Example: const response = await fetch('/api/register', { method: 'POST', body: JSON.stringify(formData) });
      // Handle the response from the server, and if registration is successful, setRegistrationSuccess(true);
      // Otherwise, handle the error.
      // For now, let's simulate success after a delay:
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate an API call delay
      setRegistrationSuccess(true);
    } catch (error) {
      // Handle registration error here
      console.error('Registration failed:', error);
    }
  };

  return (
    <div>
      <h1>User Registration</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" onChange={handleInputChange} />
        <input type="email" name="email" placeholder="Email" onChange={handleInputChange} />
        <input type="password" name="password" placeholder="Password" onChange={handleInputChange} />
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

