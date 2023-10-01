import React, { useState, useEffect } from 'react';
import { Player } from '@livepeer/react';
import ObjectViewer from '../../elements/display/DisplayObject';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { getViewership } from '../../../apis/livepeer_calls';
import { getVideo } from '../../../apis/database';

const Container = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 100px;
  box-sizing: border-box;
  background-color: #f4f4f4;
`;

const MetricsContainer = styled(motion.div)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: 10px;
  background-color: #2c3e50;
  border-radius: 5px;
  color: white;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Metric = styled.div`
  font-size: 1rem;
`;

const Button = styled.button`
  margin-top: 10px;
  background: #27ae60;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 8px 16px;
  cursor: pointer;
`;

const MediaPlayer = ({ playbackID }) => {
  const [isExtendedData, setIsExtendedData] = useState(false);
  const [metrics, setMetrics] = useState(null);
  const [video, setVideo] = useState(null);

  useEffect(() => {
    const getMetrics = async () => {
      const _metrics = await getViewership(playbackID);
      setMetrics(_metrics);
    };
    const getVideoAsset = async () => {
      const _video = await getVideo(playbackID);
      setVideo(_video);
    };

    getMetrics();
    getVideoAsset();
  }, [playbackID]);

  return (
    <Container>
      <Player
        style={{ width: '100%', height: 'auto' }}
        title="Title"
        playbackId={playbackID}
      />
      <MetricsContainer>
        {metrics && (
          <>
            <Metric>Views: {metrics.viewCount}</Metric>
            <Metric>Watch Time: {metrics.playtimeMins} mins</Metric>
          </>
        )}
      </MetricsContainer>
      <Button onClick={() => setIsExtendedData(!isExtendedData)}>
        {`${!isExtendedData ? 'View' : 'Hide'} Extended Data`}
      </Button>
      <AnimatePresence>
        {isExtendedData && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {video && <ObjectViewer data={video} />}
          </motion.div>
        )}
      </AnimatePresence>
    </Container>
  );
};

export { MediaPlayer };