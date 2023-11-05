import React, { useMemo } from 'react'
import styled from 'styled-components'
import { OverviewCard, DataCard, RecordsCard } from './elements';
import { getIcon } from './lib/icons';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faStream, faVideo } from '@fortawesome/free-solid-svg-icons';
import { EnvironmentalMetricsCard, OperationalMetricsCard } from './elements/cards/cards';
import { ChartCard, StatusCard, TransactionHistoryCard } from './elements/cards';

/**
 * Dash Component
 * This is the main dashboard component that renders various cards within sections based on the data provided.
 * @param {Object} dashData - Contains sections and cards data for the dashboard.
 */
const Dash = ({ dashData, APP }) => {

  const { handleVerificationUI } = APP?.ACTIONS || {};

  const renderedSections = useMemo(() => {
    return dashData?.sections?.map((section, index) => (
      <DashSection key={index} alignment={section?.alignment} >
        {section?.cards?.map(renderCard)}
      </DashSection>
    ))
  }, [dashData]);

  return (
    <DashContainer initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <SectionHeading>{dashData?.name}</SectionHeading>

      {/* Render Dynamic Sections */}
      {renderedSections}

      {/**Media Creation Floating Buttons */}
      {dashData?.name === 'Your Media' && (
        <FloatingLinks>
          <Link href={'/features/upload-video'} target='_blank'>
            <FontAwesomeIcon icon={faVideo} /> Upload Video
          </Link>
          <Link href={'/features/stream'} target='_blank'>
            <FontAwesomeIcon icon={faStream} /> Start Stream
          </Link>
        </FloatingLinks>
      )}

      {dashData?.name === 'Verification' && handleVerificationUI && (
        <FloatingLinks>
          <FloatButton onClick={()=>handleVerificationUI()}>
            <FontAwesomeIcon icon={faCheckCircle} /> Open Verification
          </FloatButton>
        </FloatingLinks>
      )}

    </DashContainer>
  )
}

/**
 * RenderCard Function
 * Takes a card object and its index, and returns the appropriate JSX for the type of the card.
 * @param {Object} card - The card data.
 * @param {Number} index - The index of the card in the array.
 * @returns {JSX.Element} - The JSX for the appropriate card type.
 */
const renderCard = (card, index) => {
  const Card = () => {
    switch (card?.type) {
      case 'overview':
        {
          const { cardTitle, metricValue, metricUnit, icon } = card.data || {};
          const iconObj = getIcon(icon);
          return <OverviewCard key={index} {...{ cardTitle, metricValue, metricUnit, icon: iconObj }} width={card?.width} />;
        }
      case 'status':
        {
          const { cardTitle, status, icon } = card.data || {};
          const iconObj = getIcon(icon);
          return <StatusCard key={index} {...{ title: cardTitle, status, icon: iconObj }} width={card?.width} />;
        }
      case 'data':
        {
          const { cardTitle, icon, contents } = card.data ? card.data : {};
          const iconObj = getIcon(icon);
          return <DataCard key={index} {...{ cardTitle, contents, icon: iconObj }} width={card?.width} />
        }
      case 'data-table':
        {
          const { cardTitle, icon, contents } = card.data ? card.data : {};
          const iconObj = getIcon(icon);
          return (
            <DataCard key={index} {...{ cardTitle, contents, icon: iconObj }} isTable={true} width={card?.width} />
          )
        }
      case 'chart-card':
        {
          const { cardTitle, icon, chartType, data } = card.data ? card.data : {};
          const iconObj = getIcon(icon);
          return (
            <ChartCard key={index} {...{ label: cardTitle, type: chartType, data, icon: iconObj }} />
          )

        }
      case 'environmental-metrics':
        {
          // const { title, records } = card.data ? card.data : {};
          return (
            <EnvironmentalMetricsCard key={index} />
          )
        }
      case 'operational-metrics':
        {
          // const { title, records } = card.data ? card.data : {};
          return (
            <OperationalMetricsCard key={index} />
          )
        }
      case 'tx-history':
        {
          const { title, transactions } = card.data ? card.data : {};
          return (
            <TransactionHistoryCard key={index} {...{ title, transactions }} styles={card?.styles} />
          )
        }
      case 'records':
        {
          const { title, records } = card.data ? card.data : {};
          return (
            <RecordsCard key={index} {...{ title, records }} width={card?.width} />
          )
        }
      default:
        return (
          <p key={index}>No Component</p>
        )
    }
  }
  return (
    <motion.div key={index}>
      <Card />
    </motion.div>
  )
}

const DashContainer = styled(motion.div)`
  width: 100%;
  max-width: 1440px;
  margin: auto;
  padding: 1rem; 
     
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding-top: 2.5rem;
  
    @media (min-width: 1201px) {
      padding: 2rem 2.5rem;
    }

    @media (min-width: 769px) and (max-width: 1200px) {
      padding: 2rem 1.5rem;
    }
    
    @media (max-width: 768px) {
      padding: 2rem 0.5rem;
    }
`;

const SectionHeading = styled(motion.span)`
  font-size: 2rem;
  margin-top: 1.5rem;
  font-weight: 700;
  margin: 1.5rem;
  color: #000;

    @media (max-width: 768px) {
      font-size: 1.5rem;
    }
`;

const DashSection = styled(motion.div)`
  width: 100%;
  height: auto;
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  align-items: center;
  padding: 2.5rem;
  justify-content: ${({ alignment }) => alignment ? alignment : 'flex-start'};
  border-radius: 10px;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  transition: 1s ease-in-out;
  overflow-y: auto;

    @media (max-width: 768px) {
      flex-direction: column;
      justify-content: center;
    }
    
    @media (min-width: 768px) {
      &:hover {
        background-color: rgba(0,0,0,0.1);
      }
    }
`;

const FloatingLinks = styled.div`
  position: fixed;
  bottom: 40px;
  right: 20px;
  z-index: 999;
  display: flex;
  flex-direction: column;
`;

const Link = styled.a`
  background: #333;
  color: #fff;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 10px;
  text-decoration: none;
  display: flex;
  align-items: center;
  transition: background-color 0.3s ease;

  &:hover {
    background: #555;
    color: white;
  }

  svg {
    margin-right: 8px;
  }
`;

const FloatButton = styled.div`
  background: #333;
  color: #fff;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: 0.3s ease-in-out;
  cursor: pointer;

  user-select: none;
    -webkit-user-select: none;  // For Safari
    -moz-user-select: none;     // For Firefox
    -ms-user-select: none;      // For IE/Edge

  &:hover {
    background: #555;
    color: white;
    scale: 1.01;
  }
`;

export default Dash