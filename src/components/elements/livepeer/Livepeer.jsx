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

export default Livepeer;