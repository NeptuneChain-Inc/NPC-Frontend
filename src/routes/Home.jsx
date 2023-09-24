import React, { useEffect, useState } from 'react'

import styled from 'styled-components'
import { useParams, useNavigate } from 'react-router-dom'

import { Navbar, Sidebar, Notification, Confirmation, NotificationBar } from '../components'
import RenderDash from "../dashboards/RenderDash"
import Cookies from 'js-cookie'


const Home = ({ APP }) => {
  const navigate = useNavigate();
  const { dashID } = useParams();

  const { isMobile, user, sidebarOpen, notificationBarOpen, confirmation, notification, alert, error } = APP ? APP.STATES : {};
  
  const {
    getUser,
    handleSidebar,
    handleNotificationsBar,
    logConfirmation,
    cancelConfirmation,
    logNotification,
    handleLogOut,
  } = APP ? APP.ACTIONS : {};

  if(user===null){
    navigate('/')
  }

  console.log({user})

  return (
    <Container>
      {user && (
        <App>
        <Sidebar isOpen={sidebarOpen} />
        <NotificationBar APP={APP}/>
        <Main isSidebarOpen={sidebarOpen}>
          <Navbar APP={APP} />
          <RenderDash route={dashID} uid={user?.uid} />
          {/* {renderDash(dashID)} */}
        </Main>
      </App>
      )}
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
  width: ${({ isSidebarOpen }) => isSidebarOpen ? '80vw' : "100vw"};
  height: 100%;
  display: flex;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: auto;
  align-items: flex-start;
  flex-direction: column;
  padding-bottom: 25px;
  justify-content: flex-start;
  background-color: #eeeeee;
  box-sizing: border-box;
  transition: 0.3s ease-in-out;

  border: 2px solid green;

  @media(max-width: 767px) {
    width: ${({ isSidebarOpen }) => isSidebarOpen ? '50vw' : "100vw"};
  }

`;

