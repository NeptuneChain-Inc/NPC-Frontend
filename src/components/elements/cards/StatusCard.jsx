import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faQuestion } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

const cardVariants = {
  hidden: {
    opacity: 0,
    y: -50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const StatusCard = ({ title, status, icon = faQuestion, width }) => {
    console.warn("StatusCard Props", { title, status, icon, width })

  return (
    <MotionStatusCard
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      width={width}
    >
      <CardTitle>{title}</CardTitle>
      <CardContentContainer>
        <Icon icon={icon} />
        <StatusContainer>
          <StatusIcon icon={faCircle} color={status === 'Online' ? 'green' : 'red'} />
          <StatusText>{status}</StatusText>
        </StatusContainer>
      </CardContentContainer>
    </MotionStatusCard>
  )
};

const MotionStatusCard = styled(motion.div)`
  flex: 0 0 auto;
  width: ${({ width }) => (width ? width : 'auto')};
  min-width: 250px;
  height: auto;
  padding: 1rem;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  transition: all 0.3s;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  }
`;

const CardTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const CardContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Icon = styled(FontAwesomeIcon)`
  font-size: 2rem;
`;

const StatusContainer = styled.div`
  display: flex;
  align-items: center;
`;

const StatusIcon = styled(FontAwesomeIcon)`
  font-size: 0.8rem;
  margin-right: 0.5rem;
`;

const StatusText = styled.span`
  font-size: 1rem;
  font-weight: 500;
`;


StatusCard.propTypes = {
  title: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  icon: PropTypes.object,
  width: PropTypes.string,
};

export default StatusCard;
