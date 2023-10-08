import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { auth } from '../apis/firebase';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { onAuthStateChanged } from 'firebase/auth';
import appLogo from '../assets/logo.png'

const Container = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: #f2f2f2;
`;

const WelcomeMessage = styled.h1`
font-size: 1.25rem;
  margin-bottom: 20px;
  color: #333;
`;

const Logo = styled.img`
  height: 50px;
  width: auto;
  margin: 20px 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const StyledLink = styled(Link)`
  margin: 10px;
  text-decoration: none;
  color: white;
  background-color: #007bff;
  padding: 10px 20px;
  border-radius: 4px;
  min-width: 150px;
  text-align: center;

  &:hover {
    background-color: #0056b3;
    color: white;
  }
`;

const StyledButton = styled.button`
margin-top: 20px;
margin-bottom: 10px;
  background-color: #28a745;
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
  min-width: 150px;
  text-align: center;
  &:hover {
    background-color: #218838;
  }
`;

export default function WelcomePage() {
    const navigate = useNavigate();
    const [loggedIn, setLoggedIn] = useState(false);
    const [username, setUsername] = useState('Guest');

    useEffect(() => {
        const _userString = localStorage.getItem('user');
        let user;
        if (_userString) {
            user = JSON.parse(_userString)
        }

        if (user) {
            setLoggedIn(true);
            setUsername(user.username);
        }

        if (Cookies.get('skipWelcome')) {
            navigate('/main');
        }

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
            } else {
                console.log('User is signed out');
            }
        });

        return () => {
            unsubscribe();
        };
    }, [navigate]);

    const handleOpen = () => {
        navigate('/main');
    };

    const handleSkip = (e) => {
        Cookies.set('skipWelcome', String(e.target.checked), { expires: 7 });
    };

    return (
        <Container
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <WelcomeMessage>{`Welcome ${username}`}</WelcomeMessage>
            <Logo src={appLogo} alt="NeptuneChain Logo" />
            <ButtonContainer>
                {!loggedIn && (
                    <>
                        <StyledLink to="/register">Register</StyledLink>
                        <StyledLink to="/login">Log In</StyledLink>
                    </>
                )}
                {loggedIn && <StyledButton onClick={handleOpen}>Open Dashboard</StyledButton>}
            </ButtonContainer>
            {loggedIn && (
                <div>
                    <input type="checkbox" onChange={handleSkip} />
                    <label>Skip Welcome Page Next Time</label>
                </div>
            )}
        </Container>
    );
}
