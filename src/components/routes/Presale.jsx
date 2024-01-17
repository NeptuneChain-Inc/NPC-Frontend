// src/pages/Presale.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { createPaymentIntent } from '../../apis/stripeService';

// Dummy certificate types for demonstration
const certificateTypes = [
  { id: 'nitrogen', name: 'Nitrogen Removal Certificate', description: 'Nitrogen Removal Certificate' },
  { id: 'phosphorus', name: 'Phosphorus Removal Certificate', description: 'Phosphorus Removal Certificate' }
];

const createLineItems = (certificateType, currency, quantity, price) => [
  {
    price_data: {
      currency,
      product_data: {
        name: certificateType.name,
        description: certificateType.description,
      },
      unit_amount: price*100 // cents,
    },
    quantity,
  }
];

// Styled Components
const PresaleContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  max-width: 600px;
  margin: auto;
`;

const Title = styled.h1`
  color: #123456;
`;

const Description = styled.p`
  color: #333;
  text-align: center;
`;

const Select = styled.select`
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
`;


const Input = styled.input`
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: border-color 0.3s;
  &:focus {
    border-color: #4caf50;
  }
`;

const PayButton = styled(motion.button)`
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #45a049;
  }
  &:disabled {
    background-color: #ccc;
    cursor: default;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  margin: 10px 0;
`;

const Presale = () => {
  const [amount, setAmount] = useState('');
  const [selectedType, setSelectedType] = useState(certificateTypes[0].id);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const isValidAmount = (amount) => {
    return !isNaN(amount) && amount > 0;
  };

  const handlePayment = async () => {
    if (!isValidAmount(amount)) {
      setError('Please enter a valid amount.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Call function to handle payment logic
      // await createPaymentIntent(amount, selectedType);
      console.log('Processing payment for:', selectedType, 'Amount:', amount);
      // Simulate a delay
      setTimeout(() => {
        setLoading(false);
        console.log('Payment processed');
      }, 2000);
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to process payment. Please try again.');
      setLoading(false);
    }
  };

  return (
    <PresaleContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Title>Nutrient Removal Certificates Presale</Title>
      <Description>
        Choose the type of certificate and enter the amount you wish to pay.
      </Description>
      <Select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
        {certificateTypes.map((type) => (
          <option key={type.id} value={type.id}>{type.name}</option>
        ))}
      </Select>
      <Input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter your amount"
      />
      <PayButton
        onClick={handlePayment}
        disabled={loading || !isValidAmount(amount)}
      >
        {loading ? 'Processing...' : 'Proceed to Pay'}
      </PayButton>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </PresaleContainer>
  );
};

export default Presale;
