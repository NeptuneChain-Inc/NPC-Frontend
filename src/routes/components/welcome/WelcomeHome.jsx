import React from 'react';
import styled from 'styled-components';
import { BUTTON, PROMPT_CARD } from '../../../components/lib/styled';

const Title = styled.h1`
  font-size: 2rem;
  color: #003366;
  text-align: center;
  margin-bottom: 1rem;
`;

const Paragraph = styled.p`
  font-size: 1rem;
  line-height: 1.4;
  color: #333;
  text-align: center;
  padding: 0rem 1rem;
  margin-bottom: 1rem;
`;

const ButtonContainer = styled.div`
display: flex;
flex-direction: row;
gap: 10px;
`;

export const contentVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 1, delay: 0.2 } },
};

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
    <PROMPT_CARD variants={contentVariants} initial="hidden" animate="visible">
      <Title>{username ? getDynamicWelcomeMessage(username) : 'Welcome to NeptuneChain'}</Title>
      <Paragraph>
        {username ? 'You are part of' : 'Join'} our mission to clean the planet's waters. Connect and trade in the market of the seas.
      </Paragraph>
      <ButtonContainer>
        {username ? (
          <BUTTON whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={enterDash}>
            Open Dashboard
          </BUTTON>
        ) : (
          <>
            <BUTTON whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setCardState?.('login')}>
              Login
            </BUTTON>
            <BUTTON whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setCardState?.('register')}>
              Register
            </BUTTON>
          </>
        )}
      </ButtonContainer>

    </PROMPT_CARD>
  )
}

export default WelcomeHome;
