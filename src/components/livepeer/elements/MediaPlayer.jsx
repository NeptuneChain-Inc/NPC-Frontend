import React, { useState, useEffect } from 'react'
import { Player } from '@livepeer/react'
import ObjectViewer from '../../elements/DisplayObject'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { getViewership } from '../../../apis/livepeer_calls'
import { AnimatePresence } from 'framer-motion'

const Container = styled(motion.div)`
    width: 100%;
    height: 100%;
    padding: 20px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const MediaDetailsContainer = styled(ObjectViewer)`
padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const MetricsContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  padding: 10px;
  width: fit-content;
  margin: 20px;
`;

const Metric = styled.div`
  font-size: 16px;
  color: #fff;
`;

const ViewershipMetrics = ({ metrics }) => {

    const { viewCount, playtimeMins } = metrics ? metrics : {};

    return (
        <MetricsContainer>
            <Metric>Views: {viewCount}</Metric>
            <Metric>Watch Time: {playtimeMins}</Metric>
            {/* Add Functon to Render all metrics from the prop */}
        </MetricsContainer>
    )
}

const Button = styled.button`
  background: #333;
  color: #fff;
  border: none;
  padding: 10px;
  cursor: pointer;
`;

//use data to retrieve asset and metrics
const MediaPlayer = ({ playbackId }) => {
    const [isExtendedData, setIsExtendedData] = useState(false);
    const [metrics, setMetrics] = useState(null);
    
    useEffect(() => {
        getMetrics();
    }, [playbackId])
    
    const getMetrics = async () => {
        const _metrics = await getViewership(playbackId);
        setMetrics(_metrics);
    }

    return (
        <Container>
            <Player title={"Video"} playbackId={playbackId} />
            {metrics && <ViewershipMetrics metrics={metrics} />}
            <Button onClick={() => setIsExtendedData(!isExtendedData)}>{`${!isExtendedData ? "View" : "Hide"} Data`}</Button>
            <AnimatePresence>
                {isExtendedData && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <MediaDetailsContainer data={metrics} />
                    </motion.div>
                )}
            </AnimatePresence>
        </Container>
    )
}

// //Simple Implementation
// const MediaPlayer = ({ playbackId }) => {

//     return (
//         <Container>
//             <Player title={playbackId} playbackId={playbackId} />
//         </Container>
//     )
// }

export {
    MediaPlayer
}