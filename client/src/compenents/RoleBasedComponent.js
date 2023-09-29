import React from 'react';

// This component checks the user's role and renders content accordingly
const RoleBasedComponent = ({ userRole, allowedRoles, children }) => {
  // Check if the user's role is included in the allowed roles
  const isAuthorized = allowedRoles.includes(userRole);

  return isAuthorized ? <>{children}</> : null;
};

export default RoleBasedComponent;
