import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SignupPage from '../path/to/SignupPage'; // Adjust the path accordingly

describe('SignupPage', () => {
  it('renders all input fields correctly', () => {
    const { getByPlaceholderText } = render(<SignupPage />);

    expect(getByPlaceholderText('Userrname')).toBeTruthy();
    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
    expect(getByPlaceholderText('Confirm Password')).toBeTruthy();
  });

  it('updates username state on input change', () => {
    const { getByPlaceholderText } = render(<SignupPage />);
    const usernameInput = getByPlaceholderText('Userrname');

    fireEvent.changeText(usernameInput, 'testuser');

    expect(usernameInput.props.value).toBe('testuser');
  });

  it('updates email state on input change', () => {
    const { getByPlaceholderText } = render(<SignupPage />);
    const emailInput = getByPlaceholderText('Email');

    fireEvent.changeText(emailInput, 'test@example.com');

    expect(emailInput.props.value).toBe('test@example.com');
  });

  it('updates password state on input change', () => {
    const { getByPlaceholderText } = render(<SignupPage />);
    const passwordInput = getByPlaceholderText('Password');

    fireEvent.changeText(passwordInput, 'password123');

    expect(passwordInput.props.value).toBe('password123');
  });

  it('updates confirm password state on input change', () => {
    const { getByPlaceholderText } = render(<SignupPage />);
    const confirmPasswordInput = getByPlaceholderText('Confirm Password');

    fireEvent.changeText(confirmPasswordInput, 'password123');

    expect(confirmPasswordInput.props.value).toBe('password123');
  });

  it('renders social media icons correctly', () => {
    const { getByTestId } = render(<SignupPage />);

    expect(getByTestId('google-icon')).toBeTruthy();
    expect(getByTestId('facebook-icon')).toBeTruthy();
    expect(getByTestId('twitter-icon')).toBeTruthy();
  });

  it('renders the sign-up button correctly', () => {
    const { getByText } = render(<SignupPage />);

    expect(getByText('Sign Up')).toBeTruthy();
  });

  it('renders the login link correctly', () => {
    const { getByText } = render(<SignupPage />);

    expect(getByText('Login')).toBeTruthy();
  });
});
