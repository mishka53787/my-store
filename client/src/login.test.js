import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // For expect(...).toBeInTheDocument()

import Login from './Login';

describe('User Login', () => {
  it('should display a success message on successful login', async () => {
    // Mock a successful login response
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => ({ token: 'your-auth-token' }),
      ok: true,
    });

    render(<Login />);

    // Fill out the form
    fireEvent.change(screen.getByPlaceholderText('Username or Email'), {
      target: { value: 'testuser' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'testpassword' },
    });

    // Submit the form
    fireEvent.click(screen.getByText('Login'));

   
    // Ensure that the success message is displayed
    expect(
      screen.getByText('Login successful!', { exact: false })
    ).toBeInTheDocument();
  });

  it('should handle a failed login', async () => {
    // Mock a failed login response
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => ({ error: 'Login failed' }),
      ok: false,
    });

    render(<Login />);

    // Fill out the form
    fireEvent.change(screen.getByPlaceholderText('Username or Email'), {
      target: { value: 'testuser' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'testpassword' },
    });

    // Submit the form
    fireEvent.click(screen.getByText('Login'));

    
    // Ensure that the error message is displayed
    expect(
      screen.getByText('Login failed', { exact: false })
    ).toBeInTheDocument();
  });
});
