import React from 'react';
import { render } from '@testing-library/react';
import Login from './compenents/login';

test('Login component snapshot', () => {
  const { asFragment } = render(<Login />);
  expect(asFragment()).toMatchSnapshot();
});
