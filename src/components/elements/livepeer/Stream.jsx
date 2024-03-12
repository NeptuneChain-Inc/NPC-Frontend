import { useMemo, useState, useEffect } from 'react';
import { useCreateStream } from '@livepeer/react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

import { StreamPlayer } from './elements';

// #BACKEND
import { MediaAPI } from '../../../scripts/back_door';

const StreamContainer = styled(motion.div)`
width: 100%;
height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  box-sizing: border-box;

  background-color: #f5f5f5;
`;

const StreamInput = styled.input`
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const ActionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StreamButton = styled(motion.button)`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  &:disabled {
    background-color: #ccc;
  }
`;



export const Stream = ({APP}) => {
  const [streamName, setStreamName] = useState('');
  const { mutate: createStream, data: stream, status } = useCreateStream(streamName ? { name: streamName } : null);

  const isLoading = useMemo(() => status === 'loading', [status]);
  const { user } = APP ? APP.STATES : {};
  useEffect(() => {
    if (stream?.playbackId) {
      console.log(stream);
      _saveStream();
    }
  }, [stream]);

  const _saveStream = async () => {
    if (!user?.uid) {
      return false;
    }
    const {result, error} = await MediaAPI.create.stream(stream, user?.uid);

    if(error){
      console.error(error)
      APP?.ACTIONS?.logNotification('error', error.message);
    }

    if (result) {
      APP?.ACTIONS?.logNotification('', "Stream Created");
      return result;
    }

    APP?.ACTIONS?.logNotification('alert', "Could Not Save Stream");
  }

  return (
    <StreamContainer initial={{ opacity: 0 }} animate={{ opacity: 1 }}>

      {!stream?.playbackId && (
        <StreamInput
        type="text"
        placeholder="Stream name"
        onChange={(e) => setStreamName(e.target.value)}
      />
      )}
    
      <ActionContainer>
        {!stream && (
          <StreamButton
            onClick={() => {
              createStream?.();
            }}
            disabled={isLoading || !createStream}
          >
            Create Stream
          </StreamButton>
        )}
        
      </ActionContainer>

      <AnimatePresence>
        {(stream?.playbackId && stream?.streamKey) && (
          <StreamPlayer stream={stream} />
        )}
      </AnimatePresence>
    </StreamContainer>
  );
};