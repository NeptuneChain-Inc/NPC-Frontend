import React from 'react'
import styled from 'styled-components'
import { OverviewCard, DataCard, RecordsCard } from '../components/elements';
import { getIcon } from '../components/elements/lib';

const OverviewDash = ({dashData}) => {
  return (
    <>
      <SectionHeading>{dashData.name}</SectionHeading>
      {dashData?.sections?.map((section, index) => (
        <DashSection key={index} alignment={section?.alignment} >
          {section?.cards?.map((card, index) => {
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
                    <DataCard key={index} cardTitle={cardTitle} icon={icon_obj} contents={contents} width={card?.width}/>
                  )
                }
              case 'data-table':
                {
                  const { cardTitle, icon, contents } = card.data ? card.data : {};
                  const icon_obj = getIcon(icon);
                  return (
                    <DataCard key={index} cardTitle={cardTitle} icon={icon_obj} contents={contents} isTable={true} width={card?.width}/>
                  )
                }
              case 'records':
                {
                  const { title, records } = card.data ? card.data : {};
                  return (
                    <RecordsCard key={index} title={title} records={records} width={card?.width}/>
                  )
                }
              default:
                return (
                  <p>No Component</p>
                )
            }
          })}
        </DashSection>
      ))}
    </>
  )
}

const SectionHeading = styled.span`
  font-size: 2rem;
  font-style: normal;
  margin-top: 0px;
  font-family: 'Work Sans';
  font-weight: 700;
  margin: 1.5rem;
  color: #000;
`;

const DashSection = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding-top: 1rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  padding-bottom: 1rem;
  justify-content: ${({ alignment }) => alignment ? alignment : 'flex-start'};

  // border: 1px solid black;
`;


export default OverviewDash