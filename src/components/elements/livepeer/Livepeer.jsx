import {
  LivepeerConfig,
  createReactClient,
  studioProvider,
} from '@livepeer/react';
import * as React from 'react';
import { useParams } from 'react-router-dom'
import styled from 'styled-components';
import { Navbar, NotificationBar, Sidebar } from '../../';
import { LIVEPEER_API_KEY } from '../../../apis/livepeer';
import { Stream } from './Stream';
import { VideoUpload } from './VideoUpload';
import { MediaPlayer,BasicStreamPlayer } from './elements';

const livepeerClient = createReactClient({
  provider: studioProvider({
    apiKey: LIVEPEER_API_KEY,
  }),
});

function Livepeer({ APP }) {
  const { serviceID, playbackID, liveID } = useParams();
  const { user, sidebarOpen } = APP ? APP.STATES : {};
  
  const renderService = (serviceID) => {
    switch (serviceID) {
      case 'stream':
        return (
          <Stream APP={APP} />
        )
      case 'upload-video':
        return (
          <VideoUpload APP={APP} />
        )
      default:
        return (
          <p>Service Unavailable</p>
        )
    }
  }

  console.log({ serviceID, playbackID, liveID });



  return (
    <LivepeerConfig client={livepeerClient}>
      <Container>
        {user && (
          <App>
            <Sidebar isOpen={sidebarOpen} />
            <NotificationBar APP={APP} />
            <Main isSidebarOpen={sidebarOpen}>
              <Navbar APP={APP} />
              {serviceID && renderService(serviceID)}
              {playbackID && <MediaPlayer playbackID={playbackID} />}
              {liveID && <BasicStreamPlayer playbackId={liveID} /> }
            </Main>
          </App>
        )}
      </Container>
    </LivepeerConfig>
  );
}

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

export default Livepeer;