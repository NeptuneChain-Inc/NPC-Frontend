import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { auth } from '../apis/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import appLogo from '../assets/logo.png'
import { WELCOME_LOGO, WELCOME_HEADING, INPUT, BUTTON, BUTTON_SEC } from '../components/elements/lib/global-styled-components';
import { Notification } from '../components';

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
  width: 100%;
  max-width: 400px;
`;

export default function LogInPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
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
      //use username to retrieve email to login
      
      //Dummy db implementation
      const email = Cookies.get(username)
      
      if(email){
        await signInWithEmailAndPassword(auth, email, password);
        const user = { username, email };
        Cookies.set('user', JSON.stringify(user), { expires: 3 });

        setNotification('Login successful!');
        setTimeout(() => {
          navigate('/overview');
        }, 3000);
        
      } else {
        setError('Username Does Not Exist');
      }
      
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container>
      {error && <Notification type='error' message={error} />}
      {notification && <Notification type='notification' message={notification} />}
      <WELCOME_LOGO src={appLogo} alt="NeptuneChain Logo" onClick={() => navigate('/')} />
      <Form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleSubmit}
      >
        <WELCOME_HEADING>Log in to NeptuneChain</WELCOME_HEADING>
        <INPUT
          type="text"
          placeholder="Username..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <INPUT
          type="password"
          placeholder="Password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <BUTTON type="submit">Log in</BUTTON>
        <h3>Or</h3>
        <BUTTON_SEC className='secondary' onClick={() => navigate('/register')}>Register</BUTTON_SEC>
      </Form>
    </Container>
  );
}