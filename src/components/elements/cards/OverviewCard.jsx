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
      <div className="title-wrap">

        <Icon icon={iconDef} />
      <Title>{title}</Title>
      </div>
      <CardContentContainer>
        <MetricContainer>
          <Value>{value}</Value>
          <Unit>{unit}</Unit>
        </MetricContainer>
      </CardContentContainer>
    </MotionOverviewCard>
  );
};



const MotionOverviewCard = styled(motion.div)`
border: 1px solid ${({theme}) => theme.colors.ui200};
padding: 24px;
width: 100%;
border-radius: ${({theme}) => theme.borderRadius.default};
height: 150px; 
display: flex; 
flex-direction: column;
justify-content: center;
background: ${({theme}) => theme.colors.primary700};
 * {
   color: White !important; 
}
.title-wrap{ 
  display: flex;
  align-items: center;
  gap:8px;
  margin-bottom: 16px;
}
  @media (max-width: 767px) {
    width: 100%;
    min-width: 300px;
  }
`;

const Title = styled.span`
  font-size: 14px;
  font-weight: 500;
  text-align: left;
`;

const CardContentContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const MetricContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;

`;

const Value = styled.span`
  font-size: 2rem;
  font-weight: 600; 
  color: ${({theme}) => theme.colors.primary500};
  line-height: 1;
  transition: all 0.3s ease;
`;

const Unit = styled.span`
margin-bottom: 4px;
margin-left: 4px;
  font-size: 0.85rem;
  font-weight: 500;
  line-height: 1;
  transition: all 0.3s ease;
  text-transform: capitalize;
  color: ${({theme}) => theme.colors.ui600};
`;

const Icon = styled(FontAwesomeIcon)`
  color: ${({theme}) => theme.colors.ui800};
  font-size: 1rem;
`;

export default OverviewCard;
