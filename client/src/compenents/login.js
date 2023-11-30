import React, { useState ,useEffect} from 'react';
import axios from 'axios';
import Profile from './profile';


function Login({ setUserRole }) {
  const [formData, setFormData] = useState({
    usernameOrEmail: '',
    password: '',
  });

  const [loginSuccess, setLoginSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [accountDeleted, setAccountDeleted] = useState(false);
  const [profileUpdated, setProfileUpdated] = useState(false);
  const [userId, setUserId] = useState(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [user, setUser] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = () => {
    setShowUpdateForm(true);
  };

  const handleDelete = () => {
    setShowDeleteForm(true);
  };

 

  const [userToken, setUserToken] = useState(null); // Declare userToken state
 
  const [userCredentials, setUserCredentials] = useState({
    userId: null,
    userToken: null,
  });

  // This useEffect will set user credentials whenever userId or loginSuccess changes
  useEffect(() => {
    setUserCredentials({ userId, userToken });
  }, [userId, userToken]);

  const handleLogout = () => {
    setLoginSuccess(false);
    setUserId(null);
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
        const responseData = await response.json();
        setLoginSuccess(true);
        setUserId(responseData.userId); // Save the user ID upon successful login
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage('Login failed');
    }
  };
  

  const handleUpdateFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedFields = {
        deliveryAddress: user.deliveryAddress,
        password: user.password,
      };
  
      const response = await axios.put(`http://localhost:5000/users/${userId}`, updatedFields);
      if (response.status === 200) {
        setUser(response.data);
        setProfileUpdated(true);
      } else {
        throw new Error('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setErrorMessage('Failed to update user details');
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  };
  
  const handleDeleteFormSubmit = async () => {
    try {
      const response = await axios.delete(`http://localhost:5000/users/${userId}`);
      if (response.status === 200) {
        setAccountDeleted(true);
        handleLogout();
      } else {
        throw new Error('Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      setErrorMessage('Failed to delete user');
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
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
        {loginSuccess && <button onClick={handleLogout}>Logout</button>}
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
          <p>Login successful! +  welcome {formData.usernameOrEmail}</p>
          <Profile userId={userCredentials.username} userToken={userCredentials.userToken}  />
          
          <button onClick={handleUpdate}>Update Profile</button>
          <button onClick={handleDelete}>Delete Account</button>

          {showUpdateForm && (
            <div className="update-form">
              <h2>Update User Data</h2>
              <form onSubmit={handleUpdateFormSubmit}>
                {/* Form fields for updating profile information */}
                <input
                  type="text"
                  value={user.deliveryAddress}
                  onChange={(e) => setUser({ ...user, deliveryAddress: e.target.value })}
                  placeholder="Delivery Address"
                />
                <input
                  type="password"
                  value={user.password}
                  onChange={(e) => setUser({ ...user, password: e.target.value })}
                  placeholder="Password"
                />
                <button type="submit">Update Profile</button>
              </form>
            </div>
          )}

          {accountDeleted && (
            <div className="popup">
              <p>Account has been deleted!</p>
            </div>
          )}

          {profileUpdated && (
            <div className="popup">
              <p>Profile has been updated!</p>
            </div>
          )}

          {showDeleteForm && (
            <div className="delete-form">
              <h2>Delete User Account</h2>
              <p>Are you sure you want to delete your account?</p>
              {/* Form for deleting user account */}
              <button onClick={handleDeleteFormSubmit}>Delete Account</button>
              <button onClick={() => setShowDeleteForm(false)}>Cancel</button>
            </div>
          )}
              {errorMessage && (
        <div className="error-popup">
          <p>{errorMessage}</p>
        </div>
      )}
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
}

export default Login;