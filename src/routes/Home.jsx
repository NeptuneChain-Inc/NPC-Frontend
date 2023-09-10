import React, { useEffect, useState } from 'react'

import styled from 'styled-components'
import { useParams, useNavigate } from 'react-router-dom'

import { Confirmation, Navbar, Notification, Sidebar } from '../components'
import renderDash from '../dashboards/renderDash'
import Cookies from 'js-cookie'


const Home = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile,] = useState(isMobileScreen());
  const [confirmation, setConfirmation] = useState(null);
  const [notification, setNotification] = useState('');
  const [error, setError] = useState('');

  const { dashID } = useParams();

  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [isMobile])


  function isMobileScreen() {
    const maxWidth = 768;
    return window.innerWidth <= maxWidth;
  }

  const handleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  }

  const handleLogOut = () => {
    const logOut = () => {
      Cookies.remove('user');
      navigate('/');
    }
    const confirmation_obj = {
      msg: 'Are you sure you want to log out?',
      action: logOut
    }
    setConfirmation(confirmation_obj);
  }

  const cancelConfirmation = () => {
    setConfirmation(null);
    setError('Action Denied');
  }

  return (
    <Container>
      <App>
        {notification && (
          <Notification type='notification' message={notification} />
        )}
        {error && (
          <Notification type='error' message={error} />
        )}
        {confirmation && (
          <Confirmation isOpen={Boolean(confirmation)} message={confirmation.msg} onConfirm={confirmation.action} onCancel={cancelConfirmation} />
        )}
        <Sidebar isOpen={sidebarOpen} isMobile={isMobile} />
        <Main isSidebarOpen={sidebarOpen} isMobile={isMobile}>
          <Navbar handleSidebar={handleSidebar} sidebarOpen={sidebarOpen} handleLogOut={handleLogOut} />
          {renderDash(dashID)}
        </Main>
      </App>
      <Footer>
        <Text09>© 2023 NeptuneChain, All Rights Reserved.</Text09>
        <IconGroup1>
          {/* <Icon16 viewBox="0 0 950.8571428571428 1024">
            <path d="M925.714 233.143c-25.143 36.571-56.571 69.143-92.571 95.429 0.571 8 0.571 16 0.571 24 0 244-185.714 525.143-525.143 525.143-104.571 0-201.714-30.286-283.429-82.857 14.857 1.714 29.143 2.286 44.571 2.286 86.286 0 165.714-29.143 229.143-78.857-81.143-1.714-149.143-54.857-172.571-128 11.429 1.714 22.857 2.857 34.857 2.857 16.571 0 33.143-2.286 48.571-6.286-84.571-17.143-148-91.429-148-181.143v-2.286c24.571 13.714 53.143 22.286 83.429 23.429-49.714-33.143-82.286-89.714-82.286-153.714 0-34.286 9.143-65.714 25.143-93.143 90.857 112 227.429 185.143 380.571 193.143-2.857-13.714-4.571-28-4.571-42.286 0-101.714 82.286-184.571 184.571-184.571 53.143 0 101.143 22.286 134.857 58.286 41.714-8 81.714-23.429 117.143-44.571-13.714 42.857-42.857 78.857-81.143 101.714 37.143-4 73.143-14.286 106.286-28.571z"></path>
          </Icon16>
          <Icon18 viewBox="0 0 877.7142857142857 1024">
            <path d="M585.143 512c0-80.571-65.714-146.286-146.286-146.286s-146.286 65.714-146.286 146.286 65.714 146.286 146.286 146.286 146.286-65.714 146.286-146.286zM664 512c0 124.571-100.571 225.143-225.143 225.143s-225.143-100.571-225.143-225.143 100.571-225.143 225.143-225.143 225.143 100.571 225.143 225.143zM725.714 277.714c0 29.143-23.429 52.571-52.571 52.571s-52.571-23.429-52.571-52.571 23.429-52.571 52.571-52.571 52.571 23.429 52.571 52.571zM438.857 152c-64 0-201.143-5.143-258.857 17.714-20 8-34.857 17.714-50.286 33.143s-25.143 30.286-33.143 50.286c-22.857 57.714-17.714 194.857-17.714 258.857s-5.143 201.143 17.714 258.857c8 20 17.714 34.857 33.143 50.286s30.286 25.143 50.286 33.143c57.714 22.857 194.857 17.714 258.857 17.714s201.143 5.143 258.857-17.714c20-8 34.857-17.714 50.286-33.143s25.143-30.286 33.143-50.286c22.857-57.714 17.714-194.857 17.714-258.857s5.143-201.143-17.714-258.857c-8-20-17.714-34.857-33.143-50.286s-30.286-25.143-50.286-33.143c-57.714-22.857-194.857-17.714-258.857-17.714zM877.714 512c0 60.571 0.571 120.571-2.857 181.143-3.429 70.286-19.429 132.571-70.857 184s-113.714 67.429-184 70.857c-60.571 3.429-120.571 2.857-181.143 2.857s-120.571 0.571-181.143-2.857c-70.286-3.429-132.571-19.429-184-70.857s-67.429-113.714-70.857-184c-3.429-60.571-2.857-120.571-2.857-181.143s-0.571-120.571 2.857-181.143c3.429-70.286 19.429-132.571 70.857-184s113.714-67.429 184-70.857c60.571-3.429 120.571-2.857 181.143-2.857s120.571-0.571 181.143 2.857c70.286 3.429 132.571 19.429 184 70.857s67.429 113.714 70.857 184c3.429 60.571 2.857 120.571 2.857 181.143z"></path>
          </Icon18>
          <Icon20 viewBox="0 0 602.2582857142856 1024">
            <path d="M548 6.857v150.857h-89.714c-70.286 0-83.429 33.714-83.429 82.286v108h167.429l-22.286 169.143h-145.143v433.714h-174.857v-433.714h-145.714v-169.143h145.714v-124.571c0-144.571 88.571-223.429 217.714-223.429 61.714 0 114.857 4.571 130.286 6.857z"></path>
          </Icon20> */}
        </IconGroup1>
      </Footer>
    </Container>
  )
}

export default Home;

const Container = styled.div`
width: 100vw;
height: 100vh;

display: flex;
align-items: flex-start;
flex-direction: column;
justify-content: flex-start;

box-sizing: border-box;
overflow: hidden;

border: 2px solid red;
`;

const App = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  box-sizing: border-box;
  // border: 2px solid green;
`;

const Main = styled.div`
  flex: 0 0 auto;
  width: ${({ isSidebarOpen, isMobile }) => (isSidebarOpen && isMobile) ? '50%' : (isSidebarOpen ? "80%" : "100%")};
  height: 100%;
  display: flex;
  box-sizing: border-box;
  overflow-y: auto;
  align-items: flex-start;
  flex-direction: column;
  padding-bottom: 25px;
  justify-content: flex-start;
  background-color: #eeeeee;
  box-sizing: border-box;
  transition: 0.3s ease-in-out;

  border: 2px solid green;
`;

const Footer = styled.footer`
  width: 100%;
  bottom: 0;
  height: 20px;
  display: flex;
  position: fixed;
  box-shadow: 0px -2px 2px 0px #d4d4d4;
  align-items: center;
  padding-top: 0.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-bottom: 0.5rem;
  justify-content: space-between;
  background-color: #fff;

  @media(max-width: 767px) {
    padding-left: 2rem;
    padding-right: 2rem;
  }

  @media(max-width: 479px) {
    padding: 1rem;
    flex-direction: column;
  }
`;

const Text09 = styled.span`
  font-size: 0.7rem;

  @media(max-width: 767px) {
    text-align: center;
    margin-left: 1rem;
    margin-right: 1rem;
  }

  @media(max-width: 479px) {
    margin-left: 0px;
    margin-right: 0px;
    margin-bottom: 1rem;
  }
`;

const IconGroup1 = styled.div`
  height: auto;
  display: flex;
  align-items: center;
  padding-top: 0px;
  padding-left: 0px;
  padding-right: 0px;
  flex-direction: row;
  padding-bottom: 0px;
  justify-content: space-between;
`;

const Icon16 = styled.svg`
  width: auto;
  height: 0.8rem;
  margin-right: 1rem;
`;