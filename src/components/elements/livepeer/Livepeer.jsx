import React,  { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import {
  LivepeerConfig,
  createReactClient,
  studioProvider,
} from '@livepeer/react';
import { Stream } from './Stream';
import { MediaPlayer, BasicStreamPlayer } from './elements';
import MediaGallery from './elements/MediaGallery';
import {LivepeerAPI} from '../../../scripts/back_door';

//livepeer github docs: https://github.com/livepeer/livepeer-js?tab=readme-ov-file

function Livepeer() {
  const { serviceID, playbackID, liveID } = useParams();
  const [livepeerClient, setLivepeerClient] = useState(null);
  const [key, setKey] = useState();
  
  useEffect(() => {
    fetchKey()
  }, [])

  useEffect(() => {
    if(key){
      const client = createReactClient({
        provider: studioProvider(key)
      })
      console.log('client', {client});
      setLivepeerClient(client);
    }
  }, [key])
  

  const fetchKey =  async () => {
     try {
      setKey(await LivepeerAPI.getKey());
     } catch (error) {
      throw error;
     }
  }

  const renderService = (serviceID) => {
    switch (serviceID) {
      case 'stream':
        return (
          <Stream />
        )
      case 'upload-media':
        return (
          <MediaGallery />
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