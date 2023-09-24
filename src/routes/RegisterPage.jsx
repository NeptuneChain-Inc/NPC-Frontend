import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { auth } from '../apis/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import appLogo from '../assets/logo.png'
import { WELCOME_LOGO, WELCOME_HEADING, INPUT, BUTTON, BUTTON_SEC } from '../components/elements/lib/global-styled-components';
import { Notification } from '../components';


//Temp DB 
import Cookies from 'js-cookie';
import { createUser } from '../apis/database';

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
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  width: 300px;
`;



export default function RegisterPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [notification, setNotification] = useState('');

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError('')
      }, 5000);
    }
  }, [error])


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      const userData = user?.user;
      //convert username to lower case
      const fUser = { 
        uid: userData.uid,
        username: username?.toLowerCase(),
        email: userData.email?.toLowerCase(),
        emailVerified: userData.emailVerified
      };
      console.log(fUser);
      await createUser(fUser);

      setNotification('Registration successful!');

      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container>
      {error && <Notification type='error' message={error} />}
      {notification && <Notification type='notification' message={notification} />}
      <WELCOME_LOGO src={appLogo} alt='NeptuneChain logo' onClick={() => navigate('/')} />
      <Form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleSubmit}
      >
        <WELCOME_HEADING>Register to NeptuneChain</WELCOME_HEADING>
        <INPUT
          type="text"
          placeholder="Username..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
        <BUTTON type="submit">Register</BUTTON>
        <h3>Or</h3>
        <BUTTON_SEC onClick={() => navigate('/login')}>Log in</BUTTON_SEC>
      </Form>
    </Container>
  );
}
