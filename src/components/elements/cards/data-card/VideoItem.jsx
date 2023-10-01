import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faEye } from '@fortawesome/free-solid-svg-icons';

const ListItemContainer = styled(motion.div)`
  width: 250px;  
  padding: 10px;
  margin: auto;
  box-sizing: border-box;

  background-color: #74A4BCa1;
  border: 1px solid #000;
  border-radius: 10px;
  box-shadow: 0 0px 5px 2px rgba(0, 0, 0, 0.1);
  
  overflow: hidden;
  cursor: pointer;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 0px 10px 4px rgba(0, 0, 0, 0.1);;
  }
`;

const ListItemContent = styled.div`
  padding: 10px;
`;

const Title = styled.h2`
  font-size: 1.2rem;
  margin: 0;
  margin-bottom: 8px;
  font-weight: 600;
  color: #3F292B;
  margin-bottom: 10px;
`;

const InfoText = styled.p`
  margin: 4px 0;
  font-size: 0.9rem;
  line-height: 1.4;
`;

const LinkContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
padding: 10px;
box-sizing: border-box;
gap: 5px;
`;

const Link = styled.a`
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  color: #134B5F;
  transition: 0.3s ease-in-out;
  
  font-weight: 600;

  &:hover {
    color: #210124;
  }

  svg {
    margin-left: 5px;
  }
`;

const VideoItem = ({ data }) => {
  return (
    <ListItemContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <ListItemContent>
        <Title>{data.name}</Title>
        <InfoText>Created at: {new Date(data.createdAt).toLocaleDateString()}</InfoText>
        <InfoText>Duration: {data.videoSpec.duration} seconds</InfoText>
        <InfoText>Size: {data.size} bytes</InfoText>
        <LinkContainer>
          <Link href={`/media/${data.playbackId}`} target="_blank" rel="noopener noreferrer">
            Watch <FontAwesomeIcon icon={faEye} />
          </Link>
          <Link href={data.downloadUrl} target="_blank" rel="noopener noreferrer">
            Download <FontAwesomeIcon icon={faDownload} />
          </Link>
        </LinkContainer>
      </ListItemContent>
    </ListItemContainer>
  );
};

export default VideoItem;
