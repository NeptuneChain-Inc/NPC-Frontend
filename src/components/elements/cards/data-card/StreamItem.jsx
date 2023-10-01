import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

const StreamItemContainer = styled(motion.div)`
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

const StreamItemContent = styled.div`
  padding: 10px;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  margin: 0;
  color: #3F292B;
  margin-bottom: 10px;
`;

const Info = styled.p`
  color: #666;
  margin: 5px 0;
`;

// const Link = styled.a`
//   text-decoration: underline;
//   font-weight: bold;
//   width: 100%;
//   word-wrap: break-word;

//   color: #134B5F;
//   transition: 0.3s ease-in-out;

//   &:hover {
//     color: #210124;
//   }
// `;

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

const StreamItem = ({ stream }) => {
  return (
    <StreamItemContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <StreamItemContent>
        <Title>{stream?.name}</Title>
        <Info>Created at: {new Date(stream?.createdAt).toLocaleDateString()}</Info>
        <Info>Stream Key: {stream?.streamKey}</Info>
        <Link href={`/media/live/${stream?.playbackId}`} target="_blank" rel="noopener noreferrer">
            Watch <FontAwesomeIcon icon={faEye} />
          </Link>
      </StreamItemContent>
    </StreamItemContainer>
  );
};

export default StreamItem;
