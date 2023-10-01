import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { auth } from '../apis/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import appLogo from '../assets/logo.png'
import { WELCOME_LOGO, WELCOME_HEADING, INPUT, BUTTON, BUTTON_SEC } from '../components/lib/global-styled-components';
import { Notification } from '../components';
import { getUser, getUsername } from '../apis/database';

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
`;

export default function LogInPage({ APP }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [notification, setNotification] = useState('');
  const [usernameInputType, setUsernameInputType] = useState(true); //false means input is email

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError('')
      }, 5000);
    }
  }, [error])

  const handleUsernameInput = () => {
    const handleSwitch = () => {
    //Clear Input before switch
    if(usernameInputType){
      setUsername('');
    } else {
      setEmail('');
    }
    setUsernameInputType(!usernameInputType);
    }

    if(username || email){
      APP?.ACTIONS?.logConfirmation(`This will clear your current ${usernameInputType ? 'username' : 'email'} input`,handleSwitch);
    } else {
      handleSwitch();
    }

  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let emailLogin;

      if(email){
        emailLogin = email;
      } else if(username) {
        const _user = await getUsername(username);
        if(_user){
          emailLogin = _user?.email;
        }
      }
      
      if(emailLogin){
        const userData = await signInWithEmailAndPassword(auth, emailLogin, password);
        const user = await getUser(userData?.user?.uid)
        if(user) {
          Cookies.set('user', JSON.stringify(user), { expires: 3 });
        APP?.ACTIONS?.getUser();
        setNotification('Login successful!');
        setTimeout(() => {
          navigate('/overview');
        }, 3000);
        }
        
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
        {usernameInputType ? (
        <INPUT
        type="text"
        placeholder="Username..."
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        style={{marginBottom: 10}}
      />
        ) : (
          <INPUT
          type="email"
          placeholder="Email Address..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{marginBottom: 10}}
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
        <BUTTON type="submit">Log in</BUTTON>
        <h3>Or</h3>
        <BUTTON_SEC className='secondary' onClick={() => navigate('/register')}>Register</BUTTON_SEC>
      </Form>
    </Container>
  );
}