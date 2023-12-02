import React from 'react'
import styled from 'styled-components'
import { useParams, useNavigate } from 'react-router-dom'
import { Navbar, Sidebar, NotificationBar } from '../components'
import RenderDash from '../dashboards/RenderDash'
import { faShop } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { motion } from 'framer-motion'
import { logoColors } from '../styles/colors'

const colors = {
  antiqueWhite: '#FFE8D1',
  airForceBlue: '#568EA3',
  rawUmber: '#826251',
 }


const Home = ({ APP }) => {
  const navigate = useNavigate();
  const { dashID } = useParams();
  const { user, searchResults, sidebarOpen } = APP ? APP.STATES : {};


  if (user === null) {
    navigate('/')
  }

  return (
    <Container>
      {user && (
        <App>
          <Sidebar isOpen={sidebarOpen} user={user} />
          <NotificationBar APP={APP} />
          <Main isSidebarOpen={sidebarOpen}>
            <Navbar APP={APP} />
            <RenderDash route={dashID} uid={user?.uid} userDashes={user?.dashData} searchResults={searchResults} APP={APP}/>
            
            <FloatingContainer>
          <FloatButton
            onClick={() => navigate('/marketplace')}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FontAwesomeIcon icon={faShop} />
          </FloatButton>
          </FloatingContainer>

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

const FloatingContainer = styled(motion.div)`
  position: fixed;
  right: 1.5rem;
  bottom: 1.5rem;
  width: 60px;
  border-radius: 50%;
  border: 1px solid ${colors.antiqueWhite};
  box-shadow: 0 2px 10px rgba(0, 0, 0, 1);
  z-index: 1000; 
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 10px;
  font-size: 24px; // Icon size
`;

const FloatButton = styled(motion.div)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${logoColors.accent};
  color: white;
  border: 1px solid ${logoColors.accent};
  box-shadow: 0 2px 10px rgba(0, 0, 0, 1);
  z-index: 1000; 
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px; // Icon size
`;

