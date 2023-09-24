import { useMemo, useState, useEffect } from 'react';
import { Player, useCreateStream } from '@livepeer/react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import ObjectDisplay from '../elements/DisplayObject';
import { StreamBroadcast } from './StreamBroadcast';
import { SaveStream } from '../../apis/database';


const StreamInformation = ({ stream }) => {
  const [isExtendedData, setIsExtendedData] = useState(false);

  // Styles
const StreamInformationContainer = styled(motion.div)`
padding: 20px;
background-color: #f4f4f4;
border-radius: 8px;
`;

const StreamBasicInfo = styled.table`
width: 100%;
margin-bottom: 20px;

th,
td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}
`;

const ExtendedData = styled(motion.div)`
border-top: 1px solid #ccc;
padding-top: 20px;
overflow: hidden;
`;

const ViewButton = styled(motion.button)`
padding: 8px 16px;
margin-top: 10px;
margin-bottom: 10px;
cursor: pointer;
border: none;
background-color: #007bff;
color: white;
border-radius: 4px;
`;

  return (
    <StreamInformationContainer initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <StreamBasicInfo>
        <tbody>
          <tr>
            <th>Stream Name</th>
            <td>{stream?.name}</td>
          </tr>
          <tr>
            <th>Stream Status</th>
            <td>{stream?.isActive ? 'Active' : 'Not Active'}</td>
          </tr>
          <tr>
            <th>Stream Key</th>
            <td>{stream?.streamKey}</td>
          </tr>
          <tr>
            <th>PlaybackId</th>
            <td>{stream?.playbackId}</td>
          </tr>
          <tr>
            <th>Stream Link</th>
            <td><a href={stream?.playbackUrl}>{stream?.playbackUrl}</a></td>
          </tr>
        </tbody>
      </StreamBasicInfo>
      <ViewButton onClick={() => setIsExtendedData(!isExtendedData)}>
        {!isExtendedData ? 'View More' : 'View Less'}
      </ViewButton>
      <AnimatePresence>
        {isExtendedData && (
          <ExtendedData initial={{ height: 0 }} animate={{ height: '300px' }} exit={{ height: 0 }}>
            <ObjectDisplay data={stream} />
          </ExtendedData>
        )}
      </AnimatePresence>
    </StreamInformationContainer>
  );
};
 

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

const BroadcastButton = styled(StreamButton)`
background-color: red;
`;

export const Stream = ({APP}) => {
  const [streamName, setStreamName] = useState('');
  const [isWebBroadcast, setIsWebBroadcast] = useState(false);
  const { mutate: createStream, data: stream, status } = useCreateStream(streamName ? { name: streamName } : null);

  const isLoading = useMemo(() => status === 'loading', [status]);
  const { user } = APP ? APP.STATES : {};
  useEffect(() => {
    if (stream?.playbackId) {
      console.log(stream);
      _SaveStream();
    }
  }, [stream]);

  const webBroadcast = {
    isWebBroadcast,
    setIsWebBroadcast
  }

  const _SaveStream = async()=>{
    if(!user?.uid){
      return false;
    }
    const isSaved = await SaveStream(stream, user?.uid);
    if(isSaved){
      APP?.ACTIONS?.logNotification('', "Stream Created");
    } else if (isSaved?.error) {
      APP?.ACTIONS?.logNotification('error', isSaved.error.message);
    } else {
      APP?.ACTIONS?.logNotification('alert', "Could Not Save Stream");
    }
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
      <AnimatePresence>
        {stream?.playbackId && (
          <Player title={stream?.name} playbackId={stream?.playbackId} autoPlay muted />
        )}
      </AnimatePresence>
      
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
        {stream?.playbackId && <StreamInformation stream={stream} />}
        {stream?.streamKey && <BroadcastButton onClick={()=>setIsWebBroadcast(!isWebBroadcast)}>Broadcast Stream</BroadcastButton>}
        {(isWebBroadcast && stream?.streamKey) && <StreamBroadcast streamKey={stream.streamKey} webBroadcast={webBroadcast} />}
      </ActionContainer>
    </StreamContainer>
  );
};