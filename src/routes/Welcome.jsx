import React, { useState } from 'react';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import LoginForm from './components/welcome/LoginForm';
import RegisterForm from './components/welcome/RegisterForm';
import { WelcomeHome } from './components/welcome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const backgroundImage = new URL('../assets/wallpapers/neptune_ocean.png', import.meta.url).href;
const logoImage = new URL('../assets/logo.png', import.meta.url).href; './assets/';

// Styled components
const FullScreenWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  text-align: center;
  padding: 20px;
  box-sizing: border-box;
`;

const StyledLogo = styled(motion.img)`
  width: 80%;
  max-width: 300px;
  margin-bottom: 2rem;
`;

const HomeIcon = styled(FontAwesomeIcon)`
background: rgba(255, 255, 255, 0.8);
  padding: 1rem;
  border-radius: 50%;
  box-sizing: border-box;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  margin-top: 1rem;
  cursor: pointer;
  transition: 0.3s ease-in-out;

  &:hover {
    scale: 1.1;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  }
`;


const logoVariants = {
  hidden: { y: -50, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 1 } },
};


const Welcome = ({ APP }) => {
  const navigate = useNavigate();
  const [cardState, setCardState] = useState('');
  const { user } = APP?.STATES || {};
  const { updateUser } = APP?.ACTIONS || {};

  const enterDash = () => navigate('/dashboard/main');

  return (
    <FullScreenWrapper>

      <StyledLogo
        src={logoImage}
        alt="NeptuneChain Logo"
        variants={logoVariants}
        initial="hidden"
        animate="visible"
      />

      {cardState === 'login' ? (
        <AnimatePresence mode='wait'>
          <LoginForm key="login" onSuccess={enterDash} updateUser={updateUser} onSwitchToRegister={() => setCardState('register')} APP={APP} />
        </AnimatePresence>
      ) : cardState === 'register' ? (
        <AnimatePresence mode='wait'>
          <RegisterForm key="register" onSuccess={enterDash} updateUser={updateUser} onSwitchToLogin={() => setCardState('login')} />
        </AnimatePresence>
      ) : (
        <AnimatePresence mode='wait'>
          <WelcomeHome key="welcome" user={user} setCardState={setCardState} enterDash={enterDash} />
        </AnimatePresence>
      )}

      {cardState !== '' && <HomeIcon icon={faHome} onClick={() => setCardState('')} />}

    </FullScreenWrapper >
  );
};

export default Welcome;
