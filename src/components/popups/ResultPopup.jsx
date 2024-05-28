import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  visibility: ${props => (props.isVisible ? 'visible' : 'hidden')};
  opacity: ${props => (props.isVisible ? '1' : '0')};
  transition: visibility 0.3s, opacity 0.3s;
`;

const PopupContainer = styled(motion.div)`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  text-align: center;
`;

const Title = styled.h3`
  margin-bottom: 15px;
`;

const Message = styled.p`
  margin-bottom: 20px;
`;

const CTAButton = styled.a`
  display: inline-block;
  background: #333;
  color: #fff;
  padding: 10px 20px;
  border-radius: 5px;
  text-decoration: none;
  cursor: pointer;
  margin: 5px;
  &:hover {
    background: #555;
  }
`;

const CloseButton = styled.a`
  position: absolute;
  top: 10px;
  right: 10px;
  color: #aaa;
  font-size: 24px;
  cursor: pointer;
  &:hover {
    color: #333;
  }
`;

const ResultPopup = ({ isVisible, title, message, txLink, onRetry, onClose }) => {
  return (
    <Overlay
      isVisible={isVisible}
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
    >
      <PopupContainer
        initial={{ scale: 0.7 }}
        animate={{ scale: isVisible ? 1 : 0.7 }}
      >
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <Title>{title}</Title>
        <Message>{message}</Message>
        {txLink ? (
          <CTAButton href={txLink} target="_blank" rel="noopener noreferrer">
            Verify
          </CTAButton>
        ) : (
          <CTAButton onClick={onRetry}>Retry</CTAButton>
        )}
      </PopupContainer>
    </Overlay>
  );
};

ResultPopup.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  txLink: PropTypes.string,
  onRetry: PropTypes.func,
  onClose: PropTypes.func.isRequired,
};

export default ResultPopup;
