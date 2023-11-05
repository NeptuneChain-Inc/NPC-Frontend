import React from 'react'
import styled from 'styled-components'
import { useParams, useNavigate } from 'react-router-dom'
import { Navbar, Sidebar, NotificationBar } from '../components'
import RenderDash from '../dashboards/RenderDash'


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

