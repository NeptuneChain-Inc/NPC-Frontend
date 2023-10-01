import React from 'react'
import styled from 'styled-components'
import { OverviewCard, DataCard, RecordsCard } from './elements';
import { getIcon } from './lib';
import { AnimatePresence, motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStream, faVideo } from '@fortawesome/free-solid-svg-icons';
import { EnvironmentalMetricsCard, OperationalMetricsCard } from './elements/cards/cards';
import { TransactionHistoryCard } from './elements/cards';

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

const OverviewDash = ({ dashData }) => {
  return (
    <DashContainer initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <SectionHeading>{dashData.name}</SectionHeading>
      <AnimatePresence>
        {dashData?.sections?.map((section, index) => (
          <DashSection key={index} alignment={section?.alignment} >
            {section?.cards?.map((card, index) => {
              const GetCard = () => {
                switch (card?.type) {
                  case 'overview':
                    {
                      const { cardTitle, metricValue, metricUnit, icon } = card.data ? card.data : {};
                      const icon_obj = getIcon(icon);
                      return (
                        <OverviewCard key={index} cardTitle={cardTitle} metricValue={metricValue} metricUnit={metricUnit} icon={icon_obj} width={card?.width} />
                      )
                    }
                  case 'data':
                    {
                      const { cardTitle, icon, contents } = card.data ? card.data : {};
                      const icon_obj = getIcon(icon);
                      return (
                        <DataCard key={index} cardTitle={cardTitle} icon={icon_obj} contents={contents} width={card?.width} />
                      )
                    }
                  case 'data-table':
                    {
                      const { cardTitle, icon, contents } = card.data ? card.data : {};
                      const icon_obj = getIcon(icon);
                      return (
                        <DataCard key={index} cardTitle={cardTitle} icon={icon_obj} contents={contents} isTable={true} width={card?.width} />
                      )
                    }
                    case 'environmental-metrics':
                      {
                        // const { title, records } = card.data ? card.data : {};
                        return (
                          <EnvironmentalMetricsCard />
                        )
                      }
                      case 'operational-metrics':
                      {
                        // const { title, records } = card.data ? card.data : {};
                        return (
                          <OperationalMetricsCard />
                        )
                      }
                    case  'tx-history':
                      {
                        const { title, transactions } = card.data ? card.data : {};
                        return (
                          <TransactionHistoryCard title={title} transactions={transactions} styles={card?.styles}/>
                        )
                      }
                  case 'records':
                    {
                      const { title, records } = card.data ? card.data : {};
                      return (
                        <RecordsCard key={index} title={title} records={records} width={card?.width} />
                      )
                    }
                  default:
                    return (
                      <p>No Component</p>
                    )
                }
              }

              return (
                <motion.div>
                  <GetCard />
                </motion.div>
              )
            })}
          </DashSection>
        ))}
      </AnimatePresence>
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
    </DashContainer>
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
  
  // Screen larger than 1200px
  @media (min-width: 1201px) {
    padding: 2rem 2.5rem;
  }

  // Screen size between 768px and 1200px
  @media (min-width: 769px) and (max-width: 1200px) {
    padding: 2rem 1.5rem;
  }
  
  // Screen size up to 768px (mobile)
  @media (max-width: 768px) {
    padding: 2rem 0.5rem;
  }

  padding-top: 2.5rem;
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


export default OverviewDash