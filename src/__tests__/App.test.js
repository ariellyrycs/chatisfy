import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';

test('renders the login page', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Enter your NickName/i);
  expect(linkElement).toBeInTheDocument();
});
