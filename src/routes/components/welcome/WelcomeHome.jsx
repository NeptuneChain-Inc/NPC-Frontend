import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const ContentWrapper = styled(motion.div)`
  width: 90%; // More responsive for mobile
  max-width: 500px;
  margin: auto; // Center align for all screen sizes
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.8);
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  @media (max-width: 600px) {
    width: 95%;
    padding: 1.5rem;
  }
`;

const Title = styled.h1`
  font-size: 2rem; // Adjusted for better mobile readability
  color: #003366; // Dark blue color, NeptuneChain's theme
  text-align: center;
  margin-bottom: 1rem;
`;

const Paragraph = styled.p`
  font-size: 1rem; // Adjusted for mobile screens
  line-height: 1.4;
  color: #333;
  text-align: center;
  margin-bottom: 2rem;
`;

const ButtonContainer = styled.div`
display: flex;
flex-direction: row;
gap: 10px;
`;

const CallToAction = styled(motion.button)`
  padding: 10px 20px;
  font-size: 1rem;
  color: white;
  background-color: #0077b6; // NeptuneChain's theme color
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 5px 0; // Added margin for better touch targets on mobile
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); // Softer shadow
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  &:hover, &:focus {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }
`;

const contentVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 1, delay: 0.5 } },
};


  // Dynamic welcome message based on time of day
  const getDynamicWelcomeMessage = (username) => {
    const hours = new Date().getHours();
    let timeOfDay = 'Day';
    if (hours < 12) {
      timeOfDay = 'Morning';
    } else if (hours < 18) {
      timeOfDay = 'Afternoon';
    } else {
      timeOfDay = 'Evening';
    }
    return `Good ${timeOfDay}, ${username}`;
  };

const WelcomeHome = ({ user, setCardState, enterDash }) => {

  const { username } = user || {};
  return (
    <ContentWrapper variants={contentVariants} initial="hidden" animate="visible">
      <Title>{username ? getDynamicWelcomeMessage(username) : 'Welcome to NeptuneChain'}</Title>
      <Paragraph>
        {username ? 'You are part of' : 'Join'} our mission to clean the planet's waters. Connect and trade in the market of the seas.
      </Paragraph>
      <ButtonContainer>
      {username ? (
        <CallToAction whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={enterDash}>
          Enter the App
        </CallToAction>
      ) : (
        <>
          <CallToAction whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setCardState?.('login')}>
            Login
          </CallToAction>
          <CallToAction whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setCardState?.('register')}>
            Register
          </CallToAction>
        </>
      )}
      </ButtonContainer>
      
    </ContentWrapper>
  )
}

export default WelcomeHome;
