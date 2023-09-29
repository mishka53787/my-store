import { render, screen } from '@testing-library/react';
import RoleBasedComponent from './compenents/RoleBasedComponent';

test('renders content for admin user', () => {
  render(
    <RoleBasedComponent userRole="admin" allowedRoles={['admin']}>
      <div>Admin Content</div>
    </RoleBasedComponent>
  );
  const adminContent = screen.getByText(/Admin Content/i);
  expect(adminContent).toBeInTheDocument();
});

test('does not render content for user when user role is admin', () => {
  render(
    <RoleBasedComponent userRole="admin" allowedRoles={['user']}>
      <div>User Content</div>
    </RoleBasedComponent>
  );
  const userContent = screen.queryByText(/User Content/i);
  expect(userContent).not.toBeInTheDocument();
});

// Write similar tests for other role scenarios.
