import { Player } from '@livepeer/react';
import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import StreamInformation from './StreamInformation';
import { StreamBroadcast } from '../StreamBroadcast';
import { getStream } from '../../../../apis/database';

// Main container for the stream player
const Container = styled(motion.div)`
  width: 100%;
  min-width: 300px;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 100px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 50px;
    padding-top: 100px;
  }
`;

// Styled broadcast button with subtle hover effects and disabled state
const BroadcastButton = styled(motion.button)`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: #E74C3C;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #C0392B;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const PlayerContainer = styled(motion.div)`
  width: 100%;
`;

// StreamPlayer Component
const StreamPlayer = ({ stream }) => {
  const [isWebBroadcast, setIsWebBroadcast] = useState(false);
  const webBroadcast = {
    isWebBroadcast,
    setIsWebBroadcast,
  };

  return (
    <Container>
      <PlayerContainer>
        {stream?.playbackId && (
          <Player title={stream?.name} playbackId={stream?.playbackId} autoPlay muted />
        )}
      </PlayerContainer>

      {stream?.playbackId && <StreamInformation stream={stream} />}
      {stream?.streamKey && (
        <BroadcastButton onClick={() => setIsWebBroadcast(!isWebBroadcast)}>
          Broadcast Stream
        </BroadcastButton>
      )}
      {(isWebBroadcast && stream?.streamKey) && (
        <StreamBroadcast streamKey={stream.streamKey} webBroadcast={webBroadcast} />
      )}
    </Container>
  );
};

// BasicStreamPlayer Component
const BasicStreamPlayer = ({ playbackId }) => {
  const [stream, setStream] = useState({});

  useEffect(() => {
    const retrieveStream = async () => {
      const _stream = await getStream(playbackId);
      setStream(_stream);
    }
    retrieveStream();
  }, [playbackId])

  return (
    <>
      {stream ? (
        <StreamPlayer stream={stream} />
      ) : (
        <Player title={"Stream"} playbackId={playbackId} autoPlay muted />
      )}
    </>
  );
};

export { StreamPlayer, BasicStreamPlayer };
