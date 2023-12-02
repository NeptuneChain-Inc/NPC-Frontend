import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { auth } from '../apis/firebase';
import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import appLogo from '../assets/logo.png'
import { WELCOME_LOGO, WELCOME_HEADING, INPUT, BUTTON, BUTTON_SEC, LOADING_ANIMATION } from '../components/lib/styled';
import { Notification } from '../components/popups';
import { getUsername } from '../apis/database';
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
  width: 100%;
  max-width: 400px;

  .option{
    border-bottom: 1px solid #134b5f80;
    width: 300px;
    white-space: nowrap;
    margin: auto;
    font-size: 0.7rem;
    margin-bottom: 24px; 
    color: #134b5f;
    cursor: pointer;
    transition: 0.3s ease-in-out;

    &:hover{
      font-size: 0.69rem;
    }
  }

  h4 {
    margin: 0px;
  }

  .passwordReset {
    cursor: pointer;
    transition: 0.3s ease-in-out;

    &:hover {
      scale: 1.05;
    }
  }
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

function isValidEmail(email) {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return regex.test(email);
}

export default function LogInPage({ APP }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [notification, setNotification] = useState('');
  const [usernameInputType, setUsernameInputType] = useState(true); //false means input is email
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { logNotification } = APP?.ACTIONS || {};
  
  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError('')
      }, 5000);
    }
  }, [error])

  const handleUsernameInput = () => {
    const handleSwitch = () => {
      if (usernameInputType) {
        setUsername('');
      } else {
        setEmail('');
      }
      setUsernameInputType(!usernameInputType);
    }

    if (username || email) {
      APP?.ACTIONS?.logConfirmation(`This will clear your current ${usernameInputType ? 'username' : 'email'} input`, handleSwitch);
    } else {
      handleSwitch();
    }

  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      let emailLogin;

      if (email) {
        emailLogin = email;
      } else if (username) {
        const _user = await getUsername(username);
        if (_user) {
          emailLogin = _user?.email;
        }
      }

      if (emailLogin) {
        const userData = await signInWithEmailAndPassword(auth, emailLogin, password);
        if (await APP?.ACTIONS?.updateUser(userData?.user?.uid)) {
          setNotification('Login successful!');
          setIsSuccess(true);
          setTimeout(() => {
            navigate('/dashobard/main');
          }, 3000);
        } else {
          setError('Could Not Load User');
        }
      } else {
        setError('Username Does Not Exist');
      }

    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData: environmentalRotation,
  };

  const handleReset = async () => {

    let emailLogin;

      if (email) {
        emailLogin = email;
      } else if (username) {
        const _user = await getUsername(username);
        if (_user) {
          emailLogin = _user?.email;
        }
      }

    if (isValidEmail(emailLogin)) {
      try {
        await sendPasswordResetEmail(auth, emailLogin);
        logNotification('alert', `Password reset email sent to ${emailLogin}!`)
      } catch (error) {
        setError(`Error sending password reset email: ${error.message}`);
        logNotification('error', 'Error sending password reset email')
      }
    } else {
      logNotification('error', 'Please Enter a Valid Email or Username')
    }
  }

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

      <WELCOME_LOGO src={appLogo} alt="NeptuneChain Logo" onClick={() => navigate('/')} />
      {!isSuccess ? (
        <Form
          variants={formVariant}
          initial="hidden"
          animate="visible"
          exit="exit"
          onSubmit={handleSubmit}
        >
          <WELCOME_HEADING>Log in to NeptuneChain</WELCOME_HEADING>
          {usernameInputType ? (
            <INPUT
              type="text"
              placeholder="Username..."
              value={username}
              onChange={(e) => setUsername(e.target.value.toLowerCase())}
              required
              style={{ marginBottom: 10 }}
            />
          ) : (
            <INPUT
              type="email"
              placeholder="Email Address..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ marginBottom: 10 }}
            />
          )}
          <div className='option' onClick={handleUsernameInput}>Use {usernameInputType ? 'Email' : 'Username'} Instead</div>
          <INPUT
            type="password"
            placeholder="Password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span className='passwordReset' onClick={handleReset}>Reset Password</span>
          <BUTTON type="submit">Log in</BUTTON>
          <h4>Or</h4>
          <BUTTON_SEC className='secondary' onClick={() => navigate('/register')}>Register</BUTTON_SEC>
        </Form>
      ) : (
        <Lottie options={lottieOptions} height={100} width={100} />
      )}
    </Container>
  );
}