// CustomerInfoForm.jsx
import React, { useState } from 'react';
import { FormInputs, InputBox, Button } from '../routes/Presale';
import styled from 'styled-components';

const CustomerInfoForm = ({ onNextClick }) => {
  const [customerInfo, setCustomerInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    // Add or remove fields as necessary.
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let tempErrors = {};
    if (!customerInfo.firstName.trim()) {
      tempErrors.firstName = 'First name is required';
    }

    if (!customerInfo.lastName.trim()) {
      tempErrors.lastName = 'Last name is required';
    }

    if (!customerInfo.email.trim()) {
      tempErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(customerInfo.email)) {
      tempErrors.email = 'Email is invalid';
    }

    // Add more validation checks as needed.
    setErrors(tempErrors);

    return Object.keys(tempErrors).length === 0;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      // Proceed to the next form (checkout form)
      onNextClick();
      // Optionally, capture or send customer info here.
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo({ ...customerInfo, [name]: value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <p>Because you are not signed in</p>
      <div>
        <label htmlFor="firstName">First Name</label>
        <InputBox
          type="text"
          id="firstName"
          name="firstName"
          value={customerInfo.firstName}
          onChange={handleChange}
          className={errors.firstName ? 'error' : ''}
        />
        {errors.firstName && <div className="error-message">{errors.firstName}</div>}
      </div>
      <div>
        <label htmlFor="lastName">Last Name</label>
        <InputBox
          type="text"
          id="lastName"
          name="lastName"
          value={customerInfo.lastName}
          onChange={handleChange}
          className={errors.lastName ? 'error' : ''}
        />
        {errors.lastName && <div className="error-message">{errors.lastName}</div>}
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <InputBox
          type="email"
          id="email"
          name="email"
          value={customerInfo.email}
          onChange={handleChange}
          className={errors.email ? 'error' : ''}
        />
        {errors.email && <div className="error-message">{errors.email}</div>}
      </div>
      {/* Add additional fields as needed */}
      <Button type="submit">Next</Button>
    </form>
  );
}

export default CustomerInfoForm;