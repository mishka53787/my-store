import React, { useEffect, useState } from 'react';

const Profile = ({ userId, userToken }) => {
  const [profileInfo, setProfileInfo] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`/api/user/${userId}/profile`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${userToken}`, // Include user token for authentication
            'Content-Type': 'application/json',
          },
        
        });

        if (response.ok) {
          const userData = await response.json();
          setProfileInfo(userData);
        } else {
          throw new Error('Failed to fetch user profile');
        }
      } catch (error) {
        console.error(error);
        // Handle error state or display an error message
      }
    };

    if (userId && userToken) {
      fetchUserProfile();
    }
  }, [userId, userToken]);

  return (
    <div>
      {/* Display user profile information */}
      <h2>Profile Information</h2>
      {profileInfo ? (
        <div>
          <p>Username: {profileInfo.username}</p>
          <p>Email: {profileInfo.email}</p>

          {/* Other profile information */}
        </div>
      ) : (
        <p>Loading profile information...</p>
      )}
    </div>
  );
};

export default Profile;

