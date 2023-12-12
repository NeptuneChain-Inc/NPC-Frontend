import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../apis/firebase';
import { createUser } from '../../../apis/database';
import NotificationPopup from '../../../components/popups/NotificationPopup';
import Lottie from 'react-lottie';
import environmentalRotation from '../../../assets/animations/environmental-friendly-animation.json';
import successAnimation from '../../../assets/animations/success-animation.json';
import { BUTTON, BUTTON_SEC, INPUT, LOADING_ANIMATION } from '../../../components/lib/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faUser } from '@fortawesome/free-regular-svg-icons';
import { faLock, faPeopleGroup } from '@fortawesome/free-solid-svg-icons';

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
  overflow: auto;

  border: 1px solid black;
  backface-visibility: hidden;
  transform-style: preserve-3d;
`;

const Icon = styled(FontAwesomeIcon)`
  color: #0077b6;
  margin-right: 10px;
`;

const InputGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90%;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 5px;
  box-sizing: border-box;
`;

const Dropdown = styled.select`
  width: 90%;
  padding: 12px 16px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  -webkit-appearance: none; 
  -moz-appearance: none; 
  appearance: none;  
  background-color: white;
  cursor: pointer;
  outline: none;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

&:focus {
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
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


const RegisterForm = ({ onSuccess, onSwitchToLogin, updateUser }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accountType, setAccountType] = useState('farmer');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userData = userCredential.user;

      // Construct user data for the database
      const newUser = {
        uid: userData.uid,
        username: username.toLowerCase(),
        email: userData.email.toLowerCase(),
        type: accountType
      };

      if(await createUser(newUser)){
        setIsSuccess(Boolean(await updateUser?.()))
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

  const lottieSuccessOptions = {
    loop: true,
    autoplay: true,
    animationData: successAnimation,
  };

  return (
    <AnimatePresence>
      {error && (
        <NotificationPopup type="error" message={error} />
      )}

      {isLoading ? (
        // Loading animation
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
            <Icon icon={faUser} />
            <INPUT
              type="text"
              placeholder="Username..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </InputGroup>

          <InputGroup>
            <Icon icon={faEnvelope} />
            <INPUT
              type="email"
              placeholder="Email Address..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </InputGroup>

          <InputGroup>
            <Icon icon={faLock} />
            <INPUT
              type="password"
              placeholder="Password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </InputGroup>

          <InputGroup>
            <Icon icon={faPeopleGroup} />
            <Dropdown
              value={accountType}
              onChange={(e) => setAccountType(e.target.value)}
              required
            >
              <option value="farmer">Farmer</option>
              <option value="distributor">Distributor</option>
              <option value="retailer">Retailer</option>
            </Dropdown>
          </InputGroup>

          <BUTTON type="submit">Register</BUTTON>
          <BUTTON_SEC type="button" onClick={onSwitchToLogin}>
            Already have an account? Log in
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

export default RegisterForm;
