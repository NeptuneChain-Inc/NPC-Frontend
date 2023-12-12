import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../apis/firebase';
import Lottie from 'react-lottie';
import successAnimation from '../../../assets/animations/success-animation.json';
import environmentalRotation from '../../../assets/animations/environmental-friendly-animation.json';
import Notification from '../../../components/popups/NotificationPopup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { LOADING_ANIMATION } from '../../../components/lib/styled';

const Input = styled.input`
width: 80%;
padding: 12px 16px;
font-size: 16px;
border: 1px solid #ccc;
outline: none;
transition: border-color 0.3s ease, box-shadow 0.3s ease;

&::placeholder {
  color: #999;
}

&:focus {
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}
`;

const BUTTON = styled.button`
color: #FFF;
background-color: #0077b6;
padding: 15px 30px;
//border-radius: 50px;
box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
transition: all 0.3s ease;
cursor: pointer;

&:hover {
  background-color: #0056b3;
  color: white;
  box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.2);
  transform: translateY(-2px);
}




border: none;
border-radius: 4px;
margin-bottom: 1rem;

`;

const BUTTON_SEC = styled.span`
background-color: transparent;
color: #0077b6;
text-decoration: underline;
margin-bottom: 0;
transition: 0.3s ease-in-out;
cursor: pointer;


&:hover {
  background-color: transparent;
  color: #005f8a;
  transform: translateY(-2px);
}
`;

const Form = styled(motion.form)`
width: 50%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  background: rgba(255, 255, 255, 0.8);
  padding: 2rem;
  border-radius: 10px;
  box-sizing: border-box;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-height: 60vh;

  border: 1px solid black;
  backface-visibility: hidden;
  transform-style: preserve-3d;
`;

const Icon = styled(FontAwesomeIcon)`
  margin: auto;
  color: #fff;
`;

const InputGroup = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: space-around;
  background: #0077b6;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #ccc;
`;

const notificationVariant = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.5 },
};

const formVariant = {
  hidden: { opacity: 0, y: '-10vh' },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: '10vh' },
};

function isValidEmail(email) {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return regex.test(email);
}

const LoginForm = ({ APP, onSuccess, onSwitchToRegister, updateUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { logNotification } = APP?.ACTIONS || {};

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        onSuccess();
      }, 2000);
    }
  }, [isSuccess])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const userData = await signInWithEmailAndPassword(auth, email, password);
      setIsSuccess(Boolean(await updateUser?.(userData?.user?.uid)))
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (isValidEmail(email)) {
      try {
        await sendPasswordResetEmail(auth, email);
        logNotification('alert', `Password reset email sent to ${email}!`)
      } catch (error) {
        setError(`Error sending password reset email: ${error.message}`);
        logNotification('error', 'Error sending password reset email')
      }
    } else {
      logNotification('error', 'Please Enter a Valid Email')
    }
  }

  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData: environmentalRotation,
  };

  const lottieSuccessOptions = {
    loop: true,
    autoplay: true,
    animationData: successAnimation,
  };

  return (
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

      {isLoading ? (
        <LOADING_ANIMATION
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={notificationVariant}
      >
        <Lottie options={lottieOptions} height={100} width={100} />
      </LOADING_ANIMATION>
      ) : !isSuccess ? (
        <Form
          variants={formVariant}
          initial="hidden"
          animate="visible"
          exit="exit"
          onSubmit={handleSubmit}
        >
          <InputGroup>
            <Icon icon={faEnvelope} />
            <Input
              type='email'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </InputGroup>

          <InputGroup>
            <Icon icon={faLock} />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </InputGroup>


          <BUTTON type="submit">Log In</BUTTON>
          <BUTTON_SEC type="button" onClick={handleResetPassword}>
            Forgot Password?
          </BUTTON_SEC>
          <BUTTON_SEC type="button" onClick={onSwitchToRegister}>
            Need an account? Register
          </BUTTON_SEC>
        </Form>
      ) : (
        <LOADING_ANIMATION
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={notificationVariant}
        >
          <Lottie options={lottieSuccessOptions} height={100} width={100} />
        </LOADING_ANIMATION>
      )}
    </AnimatePresence>
  );
};

export default LoginForm;
