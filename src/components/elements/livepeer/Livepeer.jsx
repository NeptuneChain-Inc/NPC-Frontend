import React,  { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import styled from 'styled-components';
import {
  LivepeerConfig,
  createReactClient,
  studioProvider,
} from '@livepeer/react';
import { Stream } from './Stream';
import VideoUpload from './VideoUpload';
import { MediaPlayer, BasicStreamPlayer } from './elements';
import { LivepeerAPI } from '../../../scripts/back_door';
import { livepeer_API_KEY } from '../../../contracts/ref';

function Livepeer({ APP }) {
  const { serviceID, playbackID, liveID } = useParams();
  const [livepeerClient, setLivepeerClient] = useState(null);
  
  useEffect(() => {
    fetchLivepeerClient()
  }, [])

  const fetchLivepeerClient = async () => {
    // const _client = await LivepeerAPI.get.livepeerClient();
    const client = createReactClient({
      provider: studioProvider(livepeer_API_KEY)
    })
    // const { livepeerClient, error} = _client || {};


    // if(error){
    //   console.error(error)
    //   return;
    // }

    // setLivepeerClient(livepeerClient);
    setLivepeerClient(client);
  }

  const renderService = (serviceID) => {
    switch (serviceID) {
      case 'stream':
        return (
          <Stream APP={APP} />
        )
      case 'upload-media':
        return (
          <VideoUpload APP={APP} />
        )
      default:
        return (
          <p>Service Unavailable</p>
        )
    }
  }

  if(livepeerClient===null){
    return <p>Client Unavailable</p>;
  }



  return (
    <LivepeerConfig client={livepeerClient}>
      {serviceID && renderService(serviceID)}
      {playbackID && <MediaPlayer playbackID={playbackID} />}
      {liveID && <BasicStreamPlayer playbackId={liveID} />}
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