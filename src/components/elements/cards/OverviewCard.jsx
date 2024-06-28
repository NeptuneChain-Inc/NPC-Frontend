import React, { useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { getIcon } from "../../lib/icons";
import { logDev } from "../../../scripts/helpers";

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

const OverviewCard = ({ data }) => {
  if (!data) {
    return;
  }

  const { title, value, unit, icon } = data || {};
  const iconDef = getIcon(icon);

  useEffect(() => {
    if (data) {
      logDev("OverviewCard Data", { data });
    }
  }, [data]);

  return (
    <MotionOverviewCard
      variants={cardVariants}
      initial="hidden"
      animate="visible"
    >
      <Title>{title}</Title>
      <CardContentContainer>
        <MetricContainer>
          <Value>{value}</Value>
          <Unit>{unit}</Unit>
        </MetricContainer>
        <Icon icon={iconDef} />
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

const Title = styled.span`
  margin: 1rem;
  font-size: 1.1rem;
  font-weight: 600;
  text-align: left;
`;

const CardContentContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const MetricContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const Value = styled.span`
  font-size: 3rem;
  font-weight: 700;
  line-height: 1;
  transition: all 0.3s ease;
`;

const Unit = styled.span`
  font-size: 1.2rem;
  font-weight: 500;
  line-height: 1;
  transition: all 0.3s ease;
`;

const Icon = styled(FontAwesomeIcon)`
  color: #134b5f;
  font-size: 3rem;
`;

export default OverviewCard;
