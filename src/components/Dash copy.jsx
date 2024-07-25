import React, { useMemo, useCallback, useState, useEffect } from 'react';
import styled from 'styled-components';
import { OverviewCard, DataCard, RecordsCard } from './elements';
import { getIcon } from './lib/icons';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faStream, faVideo } from '@fortawesome/free-solid-svg-icons';
import { EnvironmentalMetricsCard, OperationalMetricsCard } from './elements/cards/cards';
import { ChartCard, StatusCard, TransactionHistoryCard } from './elements/cards';
import { DeviceAPI } from '../scripts/back_door';

/**
 * Dash Component
 * This is the main dashboard component that renders various cards within sections based on the data provided.
 * @param {Object} dashData - Contains sections and cards data for the dashboard.
 * @param {Object} APP - Contains global states and actions.
 */
const Dash = ({ dashData, APP }) => {
  const { user } = APP?.STATES || {};
  const { handleVerificationUI } = APP?.ACTIONS || {};

  const [statusCardData, setStatusCardData] = useState({});
  const [dataCardData, setDataCardData] = useState({});
  const [chartCardData, setChartCardData] = useState({});

  useEffect(() => {
    console.log("chartCardData", chartCardData)
  }, [chartCardData])
  

  useEffect(() => {
    const fetchData = async (card) => {
      switch (card.type) {
        case 'status': {
          const { id } = card.data || {};
          const deviceDetails = await DeviceAPI.details(id);
          setStatusCardData((prev) => ({
            ...prev,
            [id]: deviceDetails,
          }));
          break;
        }
        case 'data': {
          const { id } = card.data || {};
          const dataDetails = await DeviceAPI.data(id);
          setDataCardData((prev) => ({
            ...prev,
            [id]: dataDetails,
          }));
          break;
        }
        case 'data-table': {
          const { id } = card.data || {};
          const dataDetails = await DeviceAPI.data(id);
          setDataCardData((prev) => ({
            ...prev,
            [id]: dataDetails,
          }));
          break;
        }
        case 'chart-card': {
          const { id } = card.data || {};
          const chartDetails = await DeviceAPI.data(id);
          setChartCardData((prev) => ({
            ...prev,
            [id]: chartDetails,
          }));
          break;
        }
        default:
          break;
      }
    };

    if (dashData?.sections) {
      dashData.sections.forEach((section) => {
        section.cards.forEach(fetchData);
      });
    }
  }, [dashData]);

  const renderCard = useCallback((card, index) => {
    console.log("Rendering Card...", card);
    console.log("Data...", {statusCardData, dataCardData, chartCardData});
    const Card = () => {
      switch (card?.type) {
        case 'overview': {
          const { cardTitle, metricValue, metricUnit, icon } = card.data || {};
          const iconObj = getIcon(icon);
          return <OverviewCard key={index} {...{ cardTitle, metricValue, metricUnit, icon: iconObj }} width={card?.width} />;
        }
        case 'status': {
          const { id } = card.data || {};
          const deviceDetails = statusCardData[id] || {};
          const { name, status, icon } = deviceDetails || {};
          const iconObj = getIcon(icon);
          return name && status ? (
            <StatusCard key={index} {...{ title: name, status, icon: iconObj }} width={card?.width} />
          ) : (
            <p key={index}>Loading...</p>
          );
        }
        case 'data':
        case 'data-table': {
          const { id, cardTitle, icon } = card.data || {};
          const dataDetails = dataCardData[id] || {};
          const iconObj = getIcon(icon);
          console.log("Data & Table Data", card.data, {dataDetails, iconObj})
          return dataDetails.contents ? (
            <DataCard key={index} {...{ cardTitle, contents: dataDetails.contents, icon: iconObj }} isTable={card.type === 'data-table'} width={card?.width} />
          ) : (
            <p key={index}>Loading...</p>
          );
        }
        case 'chart-card': {
          const { id, cardTitle, icon, chartType } = card.data || {};
          const chartDetails = chartCardData[id] || {};
          const iconObj = getIcon(icon);
          console.log("Chart Data", card.data)
          console.log("Chart Data {}", {chartDetails, iconObj})
          return chartDetails ? (
            <ChartCard key={index} {...{ label: cardTitle, type: chartType, data: chartDetails, icon: iconObj }} />
          ) : (
            <p key={index}>Loading...</p>
          );
        }
        case 'environmental-metrics': {
          return <EnvironmentalMetricsCard key={index} />;
        }
        case 'operational-metrics': {
          return <OperationalMetricsCard key={index} />;
        }
        case 'tx-history': {
          const { title, transactions } = card.data || {};
          return <TransactionHistoryCard key={index} {...{ title, transactions }} styles={card?.styles} />;
        }
        case 'records': {
          const { title, records } = card.data || {};
          return <RecordsCard key={index} {...{ title, records }} width={card?.width} />;
        }
        default:
          return <p key={index}>No Component</p>;
      }
    };
    return (
      <motion.div key={index}>
        {Card()}
      </motion.div>
    );
  }, [statusCardData, dataCardData, chartCardData]);

  const renderSection = useCallback((section) => {
    return section?.cards?.map(renderCard);
  }, [renderCard]);

  const renderedSections = useMemo(() => {
    return dashData?.sections?.map((section, index) => (
      <DashSection key={index} alignment="center">
        {renderSection(section)}
      </DashSection>
    ));
  }, [dashData, renderSection]);

  return (
    <DashContainer initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      {renderedSections}
      {dashData?.name === 'Your Media' && (
        <FloatingLinks>
          <Link href={'/features/upload-media'} target='_blank'>
            <FontAwesomeIcon icon={faVideo} /> Upload Media
          </Link>
          <Link href={'/features/stream'} target='_blank'>
            <FontAwesomeIcon icon={faStream} /> Start Stream
          </Link>
        </FloatingLinks>
      )}
      {dashData?.name === 'Verification' && handleVerificationUI && (
        <FloatingLinks>
          <FloatButton onClick={() => handleVerificationUI()}>
            <FontAwesomeIcon icon={faCheckCircle} /> Open Verification
          </FloatButton>
        </FloatingLinks>
      )}
    </DashContainer>
  );
};

const DashContainer = styled(motion.div)`
  width: 100%;
  height: 100%;
  margin: auto;
  padding: 1rem; 
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  box-sizing: border-box;
  gap: 50px;
  padding-top: 10rem;
  overflow-y: auto;
`;

const DashSection = styled(motion.div)`
  width: 100%;
  display: flex;
  gap: 2rem;
  align-items: center;
  padding: 2.5rem;
  justify-content: ${({ alignment }) => alignment || 'flex-start'};
  border-radius: 10px;
  box-sizing: border-box;
  transition: 1s ease-in-out;

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
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

  &:hover {
    background: #555;
    color: white;
    scale: 1.01;
  }
`;

export default Dash;
