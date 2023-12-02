import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { auth } from '../apis/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import appLogo from '../assets/logo.png'
import { WELCOME_LOGO, WELCOME_HEADING, INPUT, BUTTON, BUTTON_SEC, LOADING_ANIMATION } from '../components/lib/styled';
import { Notification } from '../components/popups';
import { createUser } from '../apis/database';
import Lottie from 'react-lottie';
import { environmentalRotation } from '../assets/animations';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: #f2f2f2;
`;

const Form = styled(motion.form)`
display: flex;
flex-direction: column;
align-items: center;
gap: 10px;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  width: 50%;
  max-height: 60%;
  overflow: auto;

  h4 {
    margin: 0px;
  }

  label {
    margin-top: 5px;
  }
`;

const Dropdown = styled.select`
  width: 50%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const formVariant = {
  hidden: { opacity: 0, y: '-10vh' },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: '10vh' },
};

const notificationVariant = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.5 },
};


export default function RegisterPage({APP}) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accountType, setAccountType] = useState('farmer');
  const [error, setError] = useState('');
  const [notification, setNotification] = useState('');
  const [isLoading, setisLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError('')
      }, 5000);
    }
  }, [error])


  const handleSubmit = async (e) => {
    e.preventDefault();
    setisLoading(true);
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      const userData = user?.user;
      const fUser = {
        uid: userData.uid,
        username: username?.toLowerCase(),
        email: userData.email?.toLowerCase(),
        emailVerified: userData.emailVerified,
        type: accountType
      };
      if (await createUser(fUser)) {
        if (await APP?.ACTIONS?.updateUser(userData.uid)) {
          setNotification('Registration successful!');
          setIsSuccess(true);
          setTimeout(() => {
            navigate('/dashobard/main');
          }, 3000);
        }
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setisLoading(false);
    }
  };

  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData: environmentalRotation,
  };

  return (
    <Container>
      <AnimatePresence>
        {error && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={notificationVariant}
          >
            <Notification type='error' message={error} />
          </motion.div>
        )}
        {notification && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={notificationVariant}
          >
            <Notification type='notification' message={notification} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isLoading && (
          <LOADING_ANIMATION
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={formVariant}
          >
            <Lottie options={lottieOptions} height={100} width={100} />
          </LOADING_ANIMATION>
        )}
      </AnimatePresence>

      <WELCOME_LOGO src={appLogo} alt='NeptuneChain logo' onClick={() => navigate('/')} />
      {!isSuccess ? (
        <Form
          variants={formVariant}
          initial="hidden"
          animate="visible"
          exit="exit"
          onSubmit={handleSubmit}
        >
          <WELCOME_HEADING>Register to NeptuneChain</WELCOME_HEADING>
          <INPUT
            type="text"
            placeholder="Username..."
            value={username}
            onChange={(e) => setUsername(e.target.value.toLowerCase())}
            required
          />
          <INPUT
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <INPUT
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label>Account Type</label>
          <Dropdown value={accountType} onChange={(e) => setAccountType(e.target.value)} required>
            <option value="farmer">Farmer</option>
            <option value="verifier">Distributor</option>
            <option value="violator">Retailer</option>
          </Dropdown>
          <BUTTON type="submit">Register</BUTTON>
          <h4>Or</h4>
          <BUTTON_SEC onClick={() => navigate('/login')}>Log in</BUTTON_SEC>
        </Form>
      ) : (
        <Lottie options={lottieOptions} height={100} width={100} />
      )}
    </Container>
  );
}
