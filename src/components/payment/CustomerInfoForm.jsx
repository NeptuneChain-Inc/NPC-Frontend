import React, { useState, useEffect } from 'react';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import styled from 'styled-components';
import {InputBox} from './styled';

const CustomerInfoForm = ({ onNextClick }) => {
  const [customerInfo, setCustomerInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    isBusiness: false,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    // Check if user is signed in using Firebase auth
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      setIsSignedIn(true);
      // Retrieve user info and pre-fill the form
      setCustomerInfo({
        firstName: user.displayName.split(' ')[0],
        lastName: user.displayName.split(' ')[1] || '',
        email: user.email,
        isBusiness: false, // Or retrieve this info from the database
      });
    }
  }, []);

  const validateForm = () => {
    let tempErrors = {};
    if (!customerInfo.firstName.trim()) {
      tempErrors.firstName = 'First name is required';
    }

    if (!customerInfo.email.trim()) {
      tempErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(customerInfo.email)) {
      tempErrors.email = 'Email is invalid';
    }

    if (customerInfo.isBusiness && !customerInfo.lastName.trim()) {
      tempErrors.lastName = 'Last name is required for businesses';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSignIn = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      // Refresh the component after sign-in to update form fields
      setIsSignedIn(true);
    } catch (error) {
      console.error("Error during Google sign-in:", error);
      setErrors({ ...errors, signIn: 'Google sign-in failed. Please try again.' });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      setLoading(true);
      try {
        if (!isSignedIn) {
          // Implement account creation or email/password sign-in if needed
          //const auth = getAuth();
          //await signInWithEmailAndPassword(auth, customerInfo.email, 'password');
          setIsSignedIn(true);
        }
        // Proceed to the next form (checkout form)
        onNextClick(customerInfo);
      } catch (error) {
        console.error("Error during form submission:", error);
        setErrors({ ...errors, form: 'Submission failed. Please try again.' });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo({ ...customerInfo, [name]: value });
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      {!isSignedIn ? (
        <>
          <p>Sign in to continue:</p>
          <SignInButton onClick={handleSignIn}>Sign in with Google</SignInButton>
          <p>or</p>
        </>
      ) : (
        <p>Welcome back! Please confirm your details.</p>
      )}
      <FormField>
        <label htmlFor="firstName">First Name</label>
        <InputBox
          type="text"
          id="firstName"
          name="firstName"
          value={customerInfo.firstName}
          onChange={handleChange}
          className={errors.firstName ? 'error' : ''}
          required
        />
        {errors.firstName && <ErrorMessage>{errors.firstName}</ErrorMessage>}
      </FormField>
      <FormField>
        <label htmlFor="lastName">Last Name</label>
        <InputBox
          type="text"
          id="lastName"
          name="lastName"
          value={customerInfo.lastName}
          onChange={handleChange}
          className={errors.lastName ? 'error' : ''}
        />
        {errors.lastName && <ErrorMessage>{errors.lastName}</ErrorMessage>}
      </FormField>
      <FormField>
        <label htmlFor="email">Email</label>
        <InputBox
          type="email"
          id="email"
          name="email"
          value={customerInfo.email}
          onChange={handleChange}
          className={errors.email ? 'error' : ''}
          required
        />
        {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
      </FormField>
      <FormField>
        <label htmlFor="isBusiness">
          <input
            type="checkbox"
            id="isBusiness"
            name="isBusiness"
            checked={customerInfo.isBusiness}
            onChange={(e) =>
              setCustomerInfo({ ...customerInfo, isBusiness: e.target.checked })
            }
          />
          Is this for a business?
        </label>
      </FormField>
      <SubmitButton type="submit" disabled={loading}>
        {loading ? 'Processing...' : 'Next'}
      </SubmitButton>
      {errors.form && <ErrorMessage>{errors.form}</ErrorMessage>}
    </FormContainer>
  );
};

export default CustomerInfoForm;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 15px;
`;

const FormField = styled.div`
  width: 100%;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 12px;
`;

const SignInButton = styled.button`
  background-color: #4285F4;
  color: white;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  margin-bottom: 10px;
  border-radius: 4px;

  &:hover {
    background-color: #357ae8;
  }
`;

const SubmitButton = styled.button`
  background-color: #28a745;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background-color: #218838;
  }

  &:disabled {
    background-color: #94d3a2;
    cursor: not-allowed;
  }
`;
