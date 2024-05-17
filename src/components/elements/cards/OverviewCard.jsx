import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

// Framer Motion Variants for Animation
const cardVariants = {
  hidden: {
    opacity: 0,
    y: -100,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
    },
  },
};

const OverviewCard = ({ cardTitle, metricValue, metricUnit, icon, width }) => {
  return (
    <MotionOverviewCard
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      width={width}
    >
      <CardTitle>{cardTitle}</CardTitle>
      <CardContentContainer>
        <MetricContainer>
          <MetricValue>{metricValue}</MetricValue>
          <MetricUnit>{metricUnit}</MetricUnit>
        </MetricContainer>
        <Icon icon={icon}/>
      </CardContentContainer>
    </MotionOverviewCard>
  );
};

const fadeIn = keyframes`
  0% {
    background-color: rgba(0, 0, 0, 0);
  }
  100% {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const MotionOverviewCard = styled(motion.div)`
  flex: 0 0 auto;
  width: ${({width}) => width ? width : '30%'};
  height: auto;
  padding: 1.5rem;
  margin: auto;
  display: flex;
  min-width: 300px;
  position: relative;
  box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.5);
  border-radius: 8px;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: space-between;
  background-color: #ffffff;
  transition: all 0.3s ease;
  cursor: pointer;


  &:hover {
    box-shadow: 0px 6px 16px 0px rgba(0, 0, 0, 0.1);
    animation: ${fadeIn} 0.3s ease forwards;
  }

  @media (max-width: 767px) {
    width: 100%;
    min-width: 300px;
  }
`;

const CardTitle = styled.span`
  margin: 1rem;
  font-size: 1.1rem;
  font-weight: 600;
  text-align: left;

`;

const CardContentContainer = styled.div`
  display: flex;
//   padding: 0.5rem;
//   margin-bottom: 1rem;
  align-items: center;
  justify-content: space-between;
`;

const MetricContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const MetricValue = styled.span`
  font-size: 3rem;
  font-weight: 700;
  line-height: 1;
  transition: all 0.3s ease;
`;

const MetricUnit = styled.span`
  font-size: 1.2rem;
  font-weight: 500;
  line-height: 1;
  transition: all 0.3s ease;
`;

const Icon = styled(FontAwesomeIcon)`
  color: #134b5f;
  font-size: 3rem;
`;

OverviewCard.defaultProps = {
  metricUnit: 'Units',
  cardTitle: 'Card Title',
  metricValue: '0',
  icon: faQuestion,
};

OverviewCard.propTypes = {
  metricUnit: PropTypes.string,
  cardTitle: PropTypes.string,
  metricValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  icon: PropTypes.object,
};

export default OverviewCard;
